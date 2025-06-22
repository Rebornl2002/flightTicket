import Ticket from '../models/ticket.js';
import moment from 'moment';

//Create new ticket

export const createTicket = async (req, res) => {
    const newTicket = new Ticket(req.body);

    try {
        const saveTicket = await newTicket.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveTicket,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

//update ticket

export const updateTicket = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTicket,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

//update seat ticket

// export const updateSeat = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const updatedTicket = await Ticket.findByIdAndUpdate(
//       id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Successfully updated",
//       data: updatedTicket,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update. Try again ",
//     });
//   }
// };

//delete ticket

export const deleteTicket = async (req, res) => {
    const id = req.params.id;
    try {
        await Ticket.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete. Try again ',
        });
    }
};

//getSingle ticket

export const getSingleTicket = async (req, res) => {
    const id = req.params.id;
    try {
        const ticket = await Ticket.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: ticket,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket

export const getAllTicket = async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        // .skip(page * 5)
        // .limit(5);

        if (tickets.length > 0) {
            res.status(200).json({
                success: true,
                count: tickets.length,
                message: 'Successfully',
                data: tickets,
            });
        } else {
            throw new Error('No tickets found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getCheapestFutureTickets = async (req, res) => {
    try {
        const now = new Date();

        const cheapest = await Ticket.aggregate([
            {
                $match: {
                    DateGo: { $gt: now },
                },
            },
            {
                $addFields: {
                    minPrice: {
                        $min: [
                            '$FirstClass.PriceAdult',
                            '$BusinessClass.PriceAdult',
                            '$PremiumClass.PriceAdult',
                            '$EconomyClass.PriceAdult',
                        ],
                    },
                },
            },
            { $sort: { minPrice: 1 } },
            { $limit: 4 },
            {
                $project: {
                    minPrice: 0,
                },
            },
        ]);

        if (cheapest.length > 0) {
            res.status(200).json({
                success: true,
                count: cheapest.length,
                message: '4 vé rẻ nhất (ngày đi sau hiện tại)',
                data: cheapest,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Không tìm thấy vé nào phù hợp',
            });
        }
    } catch (error) {
        console.error('Error fetching cheapest future tickets:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

//get ticket by search
export const getTicketBySearch = async (req, res) => {
    const AirportFrom = new RegExp(req.query.AirportFrom, 'i');
    const AirportTo = new RegExp(req.query.AirportTo, 'i');
    const DateGo = new Date(req.query.DateGo);

    try {
        const tickets = await Ticket.find({
            AirportFrom,
            AirportTo,
            DateGo,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//Fetch this for Oneway
export const getTicketBySearchCompany = async (req, res) => {
    //here 'i' means case sensitive
    const AirportFrom = new RegExp(req.query.AirportFrom, 'i');
    const AirportTo = new RegExp(req.query.AirportTo, 'i');

    const DateGo = new Date(req.query.DateGo);
    const AirlineCode = new RegExp(req.query.AirlineCode, 'i');

    try {
        const tickets = await Ticket.find({
            AirportFrom,
            AirportTo,
            DateGo,
            AirlineCode,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//Fetch this for Roundtrip
export const getTicketBySearchCompanyAndDuration = async (req, res) => {
    //here 'i' means case sensitive
    const AirportFrom = new RegExp(req.query.AirportFrom, 'i');
    const AirportTo = new RegExp(req.query.AirportTo, 'i');

    const DateGo = new Date(req.query.DateGo);
    const AirlineCode = new RegExp(req.query.AirlineCode, 'i');
    const Duration = parseInt(req.query.Duration, 10); // Assuming the Duration is provided as a query parameter

    try {
        const tickets = await Ticket.find({
            AirportFrom,
            AirportTo,
            DateGo,
            AirlineCode,
            Duration: { $lte: Duration }, // Filter for documents with Duration lower than the specified value
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketBySearchDuration = async (req, res) => {
    //here 'i' means case sensitive
    const AirportFrom = new RegExp(req.query.AirportFrom, 'i');
    const AirportTo = new RegExp(req.query.AirportTo, 'i');

    const DateGo = new Date(req.query.DateGo);
    const Duration = parseInt(req.query.Duration, 10); // Assuming the Duration is provided as a query parameter

    try {
        const tickets = await Ticket.find({
            AirportFrom,
            AirportTo,
            DateGo,
            Duration: { $lte: Duration }, // Filter for documents with Duration lower than the specified value
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//get ticket by day
export const getTicketByTodayOfCompany = async (req, res) => {
    const DateGo = new Date(req.query.DateGo);
    const airlineCode = new RegExp(`^${req.query.AirlineCode}$`);

    try {
        const tickets = await Ticket.find({
            DateGo,
            AirlineCode: airlineCode,
            // Roundtrip: {
            //   DateReturn: DateReturn,
            // },
            //function filter in mongdb: { DateGo: { $eq:ISODate("2024-01-01T17:00:00.000Z") } }
        });

        // const ticket = tickets.map((ticket) => ticket.Roundtrip.DateReturn);
        //

        // const tickets = await Ticket.find({ Duration: { $gte: Duration } });
        //

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketCompletedAll = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);

    try {
        const currentDate = new Date();

        const tickets = await Ticket.find({
            LandingTime: { $lt: currentDate },
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

const getMonth = () => {
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setMonth(currentMonthStart.getMonth(), 0);
    currentMonthStart.setHours(0, 0, 0, 0);

    const currentMonthEnd = new Date();
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1, 0);
    currentMonthEnd.setHours(23, 59, 59, 999);

    return {
        currentMonthStart: currentMonthStart,
        currentMonthEnd: currentMonthEnd,
    };
};

export const getTicketIncompletedAll = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);

    try {
        const currentDate = new Date();

        const tickets = await Ticket.find({
            LandingTime: { $gt: currentDate },
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketIncompletedMonthNowOfCompany = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);

    const currentDate = new Date();
    const currentMonthEnd = getMonth().currentMonthEnd;
    const airlineCode = new RegExp(`^${req.query.AirlineCode}$`);

    try {
        const tickets = await Ticket.find({
            LandingTime: { $gte: currentDate, $lt: currentMonthEnd },
            AirlineCode: airlineCode,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketCompletedMonthNowOfCompany = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);

    const currentDate = new Date();
    const currentMonthStart = getMonth().currentMonthStart;

    const airlineCode = new RegExp(`^${req.query.AirlineCode}$`);

    try {
        const tickets = await Ticket.find({
            LandingTime: { $gte: currentMonthStart, $lt: currentDate },
            AirlineCode: airlineCode,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getAllTicketOfCompany = async (req, res) => {
    //for pagination
    // const page = parseInt(req.query.page);

    const airlineCode = new RegExp(`^${req.query.AirlineCode}$`);

    try {
        const tickets = await Ticket.find({
            AirlineCode: airlineCode,
        });

        if (tickets.length > 0) {
            res.status(200).json({
                success: true,
                count: tickets.length,
                message: 'Successfully',
                data: tickets,
            });
        } else {
            throw new Error('No tickets found'); // Throw an error when tickets.length is <= 0
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const searchConnectingFlights = async (req, res) => {
    const { origin, destination, date } = req.query;

    const dateDay = new Date(date);
    dateDay.setUTCHours(0, 0, 0, 0);

    const dateNext = new Date(dateDay);
    dateNext.setUTCDate(dateNext.getUTCDate() + 1);
    console.log(req.query);

    try {
        const results = await Ticket.aggregate([
            {
                $match: {
                    AirportFrom: origin,
                    DateGo: { $gte: dateDay, $lt: dateNext },
                },
            },

            {
                $lookup: {
                    from: 'tickets',
                    let: {
                        arrAirport: '$AirportTo',
                        arrTime: '$LandingTime',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$AirportFrom', '$$arrAirport'] },
                                        { $eq: ['$AirportTo', destination] },
                                        { $gt: ['$FlightTime', '$$arrTime'] },
                                    ],
                                },
                            },
                        },
                    ],
                    as: 'flight2List',
                },
            },

            { $match: { 'flight2List.0': { $exists: true } } },

            { $unwind: '$flight2List' },

            {
                $project: {
                    _id: 0,
                    flight1: {
                        _id: '$_id',
                        FlightNumber: '$FlightNumber',
                        AirlineCode: '$AirlineCode',
                        AirportFrom: '$AirportFrom',
                        AirportTo: '$AirportTo',
                        DateGo: '$DateGo',
                        FlightTime: '$FlightTime',
                        LandingTime: '$LandingTime',
                        EconomyClass: '$EconomyClass',
                        BusinessClass: '$BusinessClass',
                        PremiumClass: '$PremiumClass',
                        FirstClass: '$FirstClass',
                    },
                    flight2: {
                        _id: '$flight2List._id',
                        FlightNumber: '$flight2List.FlightNumber',
                        AirlineCode: '$flight2List.AirlineCode',
                        AirportFrom: '$flight2List.AirportFrom',
                        AirportTo: '$flight2List.AirportTo',
                        DateGo: '$flight2List.DateGo',
                        FlightTime: '$flight2List.FlightTime',
                        LandingTime: '$flight2List.LandingTime',
                        EconomyClass: '$flight2List.EconomyClass',
                        BusinessClass: '$flight2List.BusinessClass',
                        PremiumClass: '$flight2List.PremiumClass',
                        FirstClass: '$flight2List.FirstClass',
                    },
                    totalPrice: {
                        $add: ['$EconomyClass.PriceAdult', '$flight2List.EconomyClass.PriceAdult'],
                    },
                    totalDuration: {
                        $subtract: ['$flight2List.LandingTime', '$FlightTime'],
                    },
                },
            },

            { $sort: { totalPrice: 1, totalDuration: 1 } },
        ]);

        res.status(200).json({
            success: true,
            count: results.length,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Tìm chuyến nối chuyến thất bại, vui lòng thử lại',
        });
    }
};
