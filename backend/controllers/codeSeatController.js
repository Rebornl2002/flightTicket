import { query } from 'express';
import CodeSeat from '../models/codeSeat.js';
import moment from 'moment';

//Create CodeSeat

export const createCodeSeat = async (req, res) => {
    const newCodeSeat = new CodeSeat(req.body);
    try {
        const saveCodeSeat = await newCodeSeat.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveCodeSeat,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again ',
        });
    }
};

//update ticket

export const updateCodeSeat = async (req, res) => {
    const id = req.params.id;
    const type = req.query.type;
    const codeSeat = req.query.seat.split(',');

    try {
        const oldCodeSeat = await CodeSeat.findOne({ FlightNumber: id }, { [type]: 1, _id: 0 });

        let codeSeatPresent;
        const getCodeSeatPresent = () => {
            if (type === 'EconomyClass') {
                codeSeatPresent = oldCodeSeat.EconomyClass;
            } else if (type === 'PremiumClass') {
                codeSeatPresent = oldCodeSeat.PremiumClass;
            } else if (type === 'BusinessClass') {
                codeSeatPresent = oldCodeSeat.BusinessClass;
            } else if (type === 'FirstClass') {
                codeSeatPresent = oldCodeSeat.FirstClass;
            }
        };

        getCodeSeatPresent();

        var isUnique = codeSeat.every((value) => !codeSeatPresent.includes(value));

        if (isUnique) {
            const updatedCodeSeat = await CodeSeat.updateOne(
                { FlightNumber: id },
                {
                    $set: { [type]: codeSeatPresent.concat(codeSeat) },
                },
                { new: true },
            );

            res.status(200).json({
                success: true,
                message: 'Successfully updated',
                data: updatedCodeSeat,
            });
        } else {
            function layPhanTuTrungLap(arr1, arr2) {
                return arr1.filter((element) => arr2.includes(element));
            }

            const ketQua = layPhanTuTrungLap(codeSeat, codeSeatPresent);
            res.status(500).json({
                success: false,
                message: 'Failed to update. Try again ',
                data: ketQua,
            });
        }
    } catch (error) {
        console.error('Error updating code seat:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
            error: error,
        });
    }
};

export const updateCodeSeatRoundTrip = async (req, res) => {
    const id = req.params.id;
    const type = req.query.type;
    const codeSeat = req.query.seat.split(',');
    const typeReturn = req.query.typeReturn;
    const codeSeatReturn = req.query.seatReturn.split(',');
    const idReturn = req.query.idReturn;

    try {
        const oldCodeSeat = await CodeSeat.findOne({ FlightNumber: id }, { [type]: 1, _id: 0 });
        const oldCodeSeatReturn = await CodeSeat.findOne({ FlightNumber: idReturn }, { [typeReturn]: 1, _id: 0 });

        let codeSeatPresent;
        let codeSeatReturnPresent;

        const getCodeSeatPresent = () => {
            if (type === 'EconomyClass') {
                codeSeatPresent = oldCodeSeat.EconomyClass;
            } else if (type === 'PremiumClass') {
                codeSeatPresent = oldCodeSeat.PremiumClass;
            } else if (type === 'BusinessClass') {
                codeSeatPresent = oldCodeSeat.BusinessClass;
            } else if (type === 'FirstClass') {
                codeSeatPresent = oldCodeSeat.FirstClass;
            }
        };

        const getCodeSeatPresentReturn = () => {
            if (typeReturn === 'EconomyClass') {
                codeSeatReturnPresent = oldCodeSeatReturn.EconomyClass;
            } else if (typeReturn === 'PremiumClass') {
                codeSeatReturnPresent = oldCodeSeatReturn.PremiumClass;
            } else if (typeReturn === 'BusinessClass') {
                codeSeatReturnPresent = oldCodeSeatReturn.BusinessClass;
            } else if (typeReturn === 'FirstClass') {
                codeSeatReturnPresent = oldCodeSeatReturn.FirstClass;
            }
        };

        getCodeSeatPresent();
        getCodeSeatPresentReturn();

        var isUnique = codeSeat.every((value) => !codeSeatPresent.includes(value));
        var isUniqueReturn = codeSeatReturn.every((value) => !codeSeatReturnPresent.includes(value));

        if (isUnique && isUniqueReturn) {
            const updatedCodeSeat = await CodeSeat.updateOne(
                { FlightNumber: id },
                {
                    $set: { [type]: codeSeatPresent.concat(codeSeat) },
                },
                { new: true },
            );

            const updatedCodeSeatReturn = await CodeSeat.updateOne(
                { FlightNumber: idReturn },
                {
                    $set: { [typeReturn]: codeSeatReturnPresent.concat(codeSeatReturn) },
                },
                { new: true },
            );

            res.status(200).json({
                success: true,
                message: 'Successfully updated',
                data: updatedCodeSeat,
                data2: updatedCodeSeatReturn,
            });
        } else {
            function layPhanTuTrungLap(arr1, arr2) {
                return arr1.filter((element) => arr2.includes(element));
            }

            const ketQua = layPhanTuTrungLap(codeSeat, codeSeatPresent);
            const ketQuaReturn = layPhanTuTrungLap(codeSeatReturn, codeSeatReturnPresent);

            res.status(500).json({
                success: false,
                message: 'Failed to update. Try again ',
                data: ketQua,
                dataReturn: ketQuaReturn,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
        });
    }
};

export const updateCodeSeatPayingFail = async (req, res) => {
    const id = req.params.id;
    const type = req.query.type;
    const codeSeat = req.query.seat.split(',');
    try {
        const updatedCodeSeat = await CodeSeat.updateOne(
            { FlightNumber: id },
            { $pull: { [type]: { $in: codeSeat } } },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedCodeSeat,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
        });
    }
};

//delete ticket

export const deleteCodeSeat = async (req, res) => {
    const id = req.params.id;
    try {
        await CodeSeat.findOneAndDelete({ FlightNumber: id });

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

export const getCodeSeatById = async (req, res) => {
    const id = req.params.id;
    try {
        const CodeSeatSearch = await CodeSeat.findOne({ FlightNumber: id });
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: CodeSeatSearch,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketDetailByFlightNumber = async (req, res) => {
    const id = req.params.id;
    try {
        const CodeSeatSearch = await CodeSeat.find({ FlightNumber: id }, { ID_Card: 1 });

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: CodeSeatSearch,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketDetailByFlightNumberRoundTrip = async (req, res) => {
    const id = req.params.id;
    const returnFlight = req.query.roundTrip;
    try {
        const CodeSeatSearch = await CodeSeat.find(
            {
                $or: [
                    { FlightNumber: id },
                    { FlightNumber: returnFlight },
                    { FlightNumberReturn: id, TypeFlight: 'Roundtrip' },
                    { FlightNumberReturn: returnFlight, TypeFlight: 'Roundtrip' },
                ],
            },
            { ID_Card: 1 },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: CodeSeatSearch,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket

export const getAllCodeSeat = async (req, res) => {
    try {
        const CodeSeat = await CodeSeat.find({});

        if (CodeSeat.length > 0) {
            res.status(200).json({
                success: true,
                count: CodeSeat.length,
                message: 'Successfully',
                data: CodeSeat,
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
