import CreditCard from '../models/creditCard.js';
import TicketDetails from '../models/ticketDetail.js';
import InforBookeds from '../models/infoBooked.js';
import Tickets from '../models/ticket.js';
import Users from '../models/user.js';
import mongoose from 'mongoose';

export const checkCreditCard = async (req, res) => {
    try {
        const { cardNumber, name, exp, cvv } = req.body;
        if (cardNumber === undefined || name === undefined || exp === undefined || cvv === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin: phải có cardNumber, name, exp, cvv',
            });
        }

        const foundCard = await CreditCard.findOne({
            cardNumber: Number(cardNumber),
            name: name,
            exp: exp,
            cvv: Number(cvv),
        });

        if (foundCard) {
            return res.status(200).json({
                success: true,
                valid: true,
                message: 'Thông tin thẻ hợp lệ',
                data: foundCard,
            });
        } else {
            return res.status(200).json({
                success: true,
                valid: false,
                message: 'Không có thẻ nào trùng khớp',
            });
        }
    } catch (error) {
        console.error('Lỗi khi kiểm tra thẻ:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server. Vui lòng thử lại sau.',
            error: error.message,
        });
    }
};

export const payTicket = async (req, res) => {
    try {
        const { typeFlight, typeTicket, flightNumber, codeTicket, codeSeat, adults, children, baby } = req.body;

        console.log(req.body);

        const seats =
            typeof codeSeat === 'string'
                ? codeSeat
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                : Array.isArray(codeSeat)
                ? codeSeat
                : [];

        if (
            !typeFlight ||
            !typeTicket ||
            !flightNumber ||
            !codeTicket ||
            seats.length === 0 ||
            adults == null ||
            children == null ||
            baby == null
        ) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc.' });
        }

        const users = await Users.find({ Sessions: codeTicket });
        if (users.length !== seats.length) {
            return res.status(400).json({
                success: false,
                message: `Số user (${users.length}) phải khớp số ghế (${seats.length}).`,
            });
        }

        const adultsUsers = users.filter((u) => u.ID_Card);
        const otherUsers = users.filter((u) => !u.ID_Card);
        if (adultsUsers.length !== adults || otherUsers.length !== children + baby) {
            return res.status(400).json({
                success: false,
                message: `Phân loại users không khớp: adults=${adultsUsers.length}/${adults}, children+baby=${
                    otherUsers.length
                }/${children + baby}.`,
            });
        }
        const childrenUsers = otherUsers.slice(0, children);
        const babyUsers = otherUsers.slice(children);

        const flight = await Tickets.findOne({ FlightNumber: flightNumber });
        if (!flight) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy chuyến bay.' });
        }
        const classInfo = flight[typeTicket];
        if (!classInfo) {
            return res.status(400).json({ success: false, message: 'Loại vé không hợp lệ.' });
        }
        const existing = classInfo.CodeSeat.filter((seat) => seats.includes(seat));
        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: `Các ghế sau đã được đặt trước: ${existing.join(', ')}.`,
            });
        }

        // thêm tất cả ghế mới
        classInfo.CodeSeat.push(...seats);
        await flight.save();

        const priceAdult = classInfo.PriceAdult;
        const details = [];
        const bookings = [];
        let offset = 0;

        const createFor = async (user, seat, suffix, idx) => {
            const ticketCode = `${codeTicket}${suffix}${idx}`;

            const d = new TicketDetails({
                TypeFlight: typeFlight,
                TypeTicket: typeTicket,
                AirportFrom: flight.AirportFrom,
                AirportTo: flight.AirportTo,
                FlightTime: flight.FlightTime,
                LandingTime: flight.LandingTime,
                DateGo: flight.DateGo,
                TotalMoney: priceAdult * (suffix === 'C' ? 0.75 : suffix === 'B' ? 0.5 : 1),
                CodeTicket: ticketCode,
                CodeTicketGeneral: codeTicket,
                FlightNumber: flightNumber,
                UserName: user.Username,
                ID_Card: user.ID_Card || '',
                CodeSeat: seat,
                Email: user.Email,
            });
            const savedDetail = await d.save();
            details.push(savedDetail);

            // 5b) InforBookeds cho cùng hành khách đó
            const b = new InforBookeds({
                TypeFlight: typeFlight,
                TypeTicket: typeTicket,
                AirportFrom: flight.AirportFrom,
                AirportTo: flight.AirportTo,
                FlightTime: flight.FlightTime,
                LandingTime: flight.LandingTime,
                DateGo: flight.DateGo,
                TotalMoneyGo: d.TotalMoney,
                TotalMoney: d.TotalMoney,
                CodeTicket: ticketCode,
                FlightNumber: flightNumber,
                UserName: user.Username,
                Email: user.Email,
                ID_Card: user.ID_Card || '',
                CodeSeat: seat,
            });
            const savedBook = await b.save();
            bookings.push(savedBook);
        };

        // Adults (suffix 'A')
        for (let i = 0; i < adultsUsers.length; i++, offset++) {
            await createFor(adultsUsers[i], seats[offset], 'A', i);
        }
        // Children (suffix 'C')
        for (let i = 0; i < childrenUsers.length; i++, offset++) {
            await createFor(childrenUsers[i], seats[offset], 'C', i);
        }
        // Baby (suffix 'B')
        for (let i = 0; i < babyUsers.length; i++, offset++) {
            await createFor(babyUsers[i], seats[offset], 'B', i);
        }

        return res.status(200).json({
            success: true,
            message: 'Đặt vé thành công cho từng hành khách.',
            ticketDetails: details,
            bookings,
        });
    } catch (error) {
        console.error('Lỗi khi thanh toán:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server.',
            error: error.message,
        });
    }
};

export const payTicketRoundTrip = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const {
            typeFlight,
            typeTicket,
            flightNumber,
            codeTicket,
            codeSeat,
            adults,
            children,
            baby,
            typeTicketReturn,
            flightNumberReturn,
            codeSeatReturn,
        } = req.body;

        console.log(req.body);

        const seats =
            typeof codeSeat === 'string'
                ? codeSeat
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                : Array.isArray(codeSeat)
                ? codeSeat
                : [];

        const seatsReturn =
            typeof codeSeatReturn === 'string'
                ? codeSeatReturn
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                : Array.isArray(codeSeatReturn)
                ? codeSeatReturn
                : [];
        if (
            !typeFlight ||
            !typeTicket ||
            !flightNumber ||
            !codeTicket ||
            seats.length === 0 ||
            adults == null ||
            children == null ||
            baby == null ||
            !typeTicketReturn ||
            !flightNumberReturn ||
            seatsReturn.length === 0
        ) {
            console.log(seats.length, seatsReturn.length);
            return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc.' });
        }

        const users = await Users.find({ Sessions: codeTicket });
        if (users.length !== seats.length) {
            return res.status(400).json({
                success: false,
                message: `Số user (${users.length}) phải khớp số ghế (${seats.length}).`,
            });
        }

        const adultsUsers = users.filter((u) => u.ID_Card);
        const otherUsers = users.filter((u) => !u.ID_Card);
        if (adultsUsers.length !== adults || otherUsers.length !== children + baby) {
            return res.status(400).json({
                success: false,
                message: `Phân loại users không khớp: adults=${adultsUsers.length}/${adults}, children+baby=${
                    otherUsers.length
                }/${children + baby}.`,
            });
        }
        const childrenUsers = otherUsers.slice(0, children);
        const babyUsers = otherUsers.slice(children);

        const flight = await Tickets.findOne({ FlightNumber: flightNumber });
        if (!flight) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy chuyến bay.' });
        }

        const flightReturn = await Tickets.findOne({ FlightNumber: flightNumberReturn });
        if (!flightReturn) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy chuyến bay khứ hồi.' });
        }

        const classInfo = flight[typeTicket];
        if (!classInfo) {
            return res.status(400).json({ success: false, message: 'Loại vé không hợp lệ.' });
        }

        const classInfoReturn = flightReturn[typeTicketReturn];
        if (!classInfoReturn) {
            return res.status(400).json({ success: false, message: 'Loại vé không hợp lệ.' });
        }

        const existing = classInfo.CodeSeat.filter((seat) => seats.includes(seat));
        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: `Các ghế sau đã được đặt trước: ${existing.join(', ')}.`,
            });
        }

        const existingReturn = classInfoReturn.CodeSeat.filter((seatReturn) => seatsReturn.includes(seatReturn));
        if (existingReturn.length > 0) {
            return res.status(409).json({
                success: false,
                message: `Các ghế sau đã được đặt trước: ${existingReturn.join(', ')}.`,
            });
        }

        const details = [];
        const bookings = [];

        await session.withTransaction(async () => {
            classInfo.CodeSeat.push(...seats);
            await flight.save({ session });

            classInfoReturn.CodeSeat.push(...seatsReturn);
            await flightReturn.save({ session });

            const priceAdult = classInfo.PriceAdult;
            const priceAdultReturn = classInfoReturn.PriceAdult;

            let offset = 0;

            const createFor = async (user, seat, suffix, idx, seatsReturn) => {
                const ticketCode = `${codeTicket}${suffix}${idx}`;

                const d = new TicketDetails({
                    TypeFlight: typeFlight,
                    TypeTicket: typeTicket,
                    AirportFrom: flight.AirportFrom,
                    AirportTo: flight.AirportTo,
                    FlightTime: flight.FlightTime,
                    LandingTime: flight.LandingTime,
                    DateGo: flight.DateGo,
                    TotalMoney: (priceAdult + priceAdultReturn) * (suffix === 'C' ? 0.75 : suffix === 'B' ? 0.5 : 1),
                    CodeTicket: ticketCode,
                    CodeTicketGeneral: codeTicket,
                    FlightNumber: flightNumber,
                    UserName: user.Username,
                    ID_Card: user.ID_Card || '',
                    CodeSeat: seat,
                    Email: user.Email,
                    TypeTicketReturn: typeTicketReturn,
                    FlightNumberReturn: flightNumberReturn,
                    FlightTimeReturn: flightReturn.FlightTime,
                    LandingTimeReturn: flightReturn.LandingTime,
                    CodeSeatReturn: seatsReturn,
                    DateReturn: flightReturn.DateGo,
                });
                const savedDetail = await d.save({ session });
                details.push(savedDetail);

                // 5b) InforBookeds cho cùng hành khách đó
                const b = new InforBookeds({
                    TypeFlight: typeFlight,
                    TypeTicket: typeTicket,
                    AirportFrom: flight.AirportFrom,
                    AirportTo: flight.AirportTo,
                    FlightTime: flight.FlightTime,
                    LandingTime: flight.LandingTime,
                    DateGo: flight.DateGo,
                    TotalMoneyGo: priceAdult * (suffix === 'C' ? 0.75 : suffix === 'B' ? 0.5 : 1),
                    TotalMoneyReturn: priceAdultReturn * (suffix === 'C' ? 0.75 : suffix === 'B' ? 0.5 : 1),
                    TotalMoney: d.TotalMoney,
                    CodeTicket: ticketCode,
                    FlightNumber: flightNumber,
                    UserName: user.Username,
                    ID_Card: user.ID_Card || '',
                    CodeSeat: seat,
                    Email: user.Email,
                    TypeTicketReturn: typeTicketReturn,
                    FlightNumberReturn: flightNumberReturn,
                    FlightTimeReturn: flightReturn.FlightTime,
                    LandingTimeReturn: flightReturn.LandingTime,
                    CodeSeatReturn: seatsReturn,
                    DateReturn: flightReturn.DateGo,
                });
                const savedBook = await b.save({ session });
                bookings.push(savedBook);
            };

            // Adults (suffix 'A')
            for (let i = 0; i < adultsUsers.length; i++, offset++) {
                await createFor(adultsUsers[i], seats[offset], 'A', offset, seatsReturn[offset]);
            }
            // Children (suffix 'C')
            for (let i = 0; i < childrenUsers.length; i++, offset++) {
                await createFor(childrenUsers[i], seats[offset], 'C', offset, seatsReturn[offset]);
            }
            // Baby (suffix 'B')
            for (let i = 0; i < babyUsers.length; i++, offset++) {
                await createFor(babyUsers[i], seats[offset], 'B', offset);
            }
        });
        session.endSession();

        return res.status(200).json({
            success: true,
            message: 'Đặt vé thành công cho từng hành khách.',
            ticketDetails: details,
            bookings,
        });
    } catch (error) {
        console.error('Lỗi khi thanh toán:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server.',
            error: error.message,
        });
    }
};

export const payTicketConnect = async (req, res) => {
    try {
        const {
            typeFlight,
            typeTicket,
            flightNumber,
            secondFlightNumber,
            codeTicket,
            codeSeat,
            secondCodeSeat,
            adults,
            children,
            baby,
        } = req.body;

        const parseSeats = (cs) =>
            typeof cs === 'string'
                ? cs
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                : Array.isArray(cs)
                ? cs
                : [];

        const seatsFirst = parseSeats(codeSeat);
        const seatsSecond = parseSeats(secondCodeSeat);

        if (
            !typeFlight ||
            !typeTicket ||
            !flightNumber ||
            !secondFlightNumber ||
            !codeTicket ||
            adults == null ||
            children == null ||
            baby == null ||
            seatsFirst.length === 0 ||
            seatsSecond.length === 0
        ) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc.' });
        }

        const users = await Users.find({ Sessions: codeTicket });
        const totalSeats = seatsFirst.length;
        if (users.length !== totalSeats) {
            return res.status(400).json({
                success: false,
                message: `Số user (${users.length}) phải khớp tổng số ghế (${totalSeats}).`,
            });
        }

        const adultsUsers = users.filter((u) => u.ID_Card);
        const otherUsers = users.filter((u) => !u.ID_Card);
        if (adultsUsers.length !== adults || otherUsers.length !== children + baby) {
            return res.status(400).json({
                success: false,
                message: `Phân loại users không khớp: adults=${adultsUsers.length}/${adults}, children+baby=${
                    otherUsers.length
                }/${children + baby}.`,
            });
        }
        const childrenUsers = otherUsers.slice(0, children);
        const babyUsers = otherUsers.slice(children);

        const segments = [
            { flightNumber, seats: seatsFirst, label: 'Segment 1' },
            { flightNumber: secondFlightNumber, seats: seatsSecond, label: 'Segment 2' },
        ];

        const allDetails = [];
        const allBookings = [];
        let globalIndex = 0;

        const createRecords = async (flightDoc, user, seat, suffix, idx) => {
            const code = `${codeTicket}${suffix}${idx}`;
            const priceMul = suffix === 'C' ? 0.75 : suffix === 'B' ? 0.5 : 1;
            const totalMoney = flightDoc[typeTicket].PriceAdult * priceMul;

            const detail = await new TicketDetails({
                TypeFlight: typeFlight,
                TypeTicket: typeTicket,
                AirportFrom: flightDoc.AirportFrom,
                AirportTo: flightDoc.AirportTo,
                FlightTime: flightDoc.FlightTime,
                LandingTime: flightDoc.LandingTime,
                DateGo: flightDoc.DateGo,
                TotalMoney: totalMoney,
                CodeTicket: code,
                CodeTicketGeneral: codeTicket,
                FlightNumber: flightDoc.FlightNumber,
                UserName: user.Username,
                ID_Card: user.ID_Card || '',
                CodeSeat: seat,
                Email: user.Email,
            }).save();
            allDetails.push(detail);

            const booking = await new InforBookeds({
                TypeFlight: typeFlight,
                TypeTicket: typeTicket,
                AirportFrom: flightDoc.AirportFrom,
                AirportTo: flightDoc.AirportTo,
                FlightTime: flightDoc.FlightTime,
                LandingTime: flightDoc.LandingTime,
                DateGo: flightDoc.DateGo,
                TotalMoneyGo: totalMoney,
                TotalMoney: totalMoney,
                CodeTicket: code,
                FlightNumber: flightDoc.FlightNumber,
                UserName: user.Username,
                Email: user.Email,
                ID_Card: user.ID_Card || '',
                CodeSeat: seat,
            }).save();
            allBookings.push(booking);
        };

        for (const { flightNumber: fn, seats, label } of segments) {
            const flightDoc = await Tickets.findOne({ FlightNumber: fn });
            if (!flightDoc) {
                return res.status(404).json({ success: false, message: `Không tìm thấy chuyến (${label}): ${fn}.` });
            }
            const classInfo = flightDoc[typeTicket];
            if (!classInfo) {
                return res.status(400).json({ success: false, message: `Loại vé không hợp lệ (${label}).` });
            }
            const dup = classInfo.CodeSeat.filter((s) => seats.includes(s));
            if (dup.length) {
                return res
                    .status(409)
                    .json({ success: false, message: `Chuyến ${label} - ghế đã đặt: ${dup.join(', ')}.` });
            }
            classInfo.CodeSeat.push(...seats);
            await flightDoc.save();

            for (let i = 0; i < adultsUsers.length; i++, globalIndex++) {
                await createRecords(flightDoc, adultsUsers[i], seats[i], 'A', globalIndex);
            }
            for (let i = 0; i < childrenUsers.length; i++, globalIndex++) {
                await createRecords(flightDoc, childrenUsers[i], seats[adultsUsers.length + i], 'C', globalIndex);
            }
            for (let i = 0; i < babyUsers.length; i++, globalIndex++) {
                await createRecords(
                    flightDoc,
                    babyUsers[i],
                    seats[adultsUsers.length + childrenUsers.length + i],
                    'B',
                    globalIndex,
                );
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Đặt vé thành công cho cả hai segment.',
            ticketDetails: allDetails,
            bookings: allBookings,
        });
    } catch (error) {
        console.error('Lỗi server:', error);
        return res.status(500).json({ success: false, message: 'Lỗi server.', error: error.message });
    }
};

const checkManyAdults = (code) => {
    let adults = 0;
    for (let i = 0; i < code.length; i++) {
        const test = code[i].CodeTicket.slice(6, 7);
        if (test === 'A') {
            adults++;
        }
    }
    if (adults === 1) {
        return false;
    } else {
        return true;
    }
};

export const deleteResourceWithRollback = async (req, res) => {
    const { id } = req.params;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const codeGeneral = id.slice(0, 6);
        const check = id.slice(6, 7);

        if (check !== 'A') {
            await TicketDetails.findOneAndDelete({ CodeTicket: id }, { session });
        } else {
            const data = await TicketDetails.find(
                { CodeTicketGeneral: codeGeneral },
                { CodeTicket: 1, _id: 0 },
                { session },
            );

            if (data.length === 1) {
                await TicketDetails.findOneAndDelete({ CodeTicket: data[0].CodeTicket }, { session });
            } else if (data.length > 1) {
                if (checkManyAdults(data)) {
                    await TicketDetails.findOneAndDelete({ CodeTicket: id }, { session });
                } else {
                    throw new Error('CHILD_ERROR_ONLY_ONE_ADULT');
                }
            }
        }

        await InforBookeds.findOneAndDelete({ CodeTicket: id }, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted both records',
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        if (error.message === 'CHILD_ERROR_ONLY_ONE_ADULT') {
            return res.status(400).json({
                success: false,
                message: 'Chỉ có 1 người lớn nên không thể hủy vé',
            });
        }

        console.error('Transaction error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete both. All changes were rolled back.',
        });
    }
};
