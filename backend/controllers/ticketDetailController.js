import ticketDetail from '../models/ticketDetail.js';
import moment from 'moment';

//Create ticketDetail

export const createticketDetail = async (req, res) => {
    const newticketDetail = new ticketDetail(req.body);
    try {
        const saveticketDetail = await newticketDetail.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveticketDetail,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again ',
        });
    }
};

//update ticket

export const updateticketDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedticketDetail = await ticketDetail.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedticketDetail,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
        });
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

export const deleteticketDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const codeGeneral = id.slice(0, 6);
        const check = id.slice(6, 7);

        if (check !== 'A') {
            await ticketDetail.findOneAndDelete({ CodeTicket: id });
            res.status(200).json({
                success: true,
                message: 'Successfully deleted',
            });
        } else {
            const data = await ticketDetail.find({ CodeTicketGeneral: codeGeneral }, { CodeTicket: 1, _id: 0 });

            if (data.length === 1) {
                await ticketDetail.findOneAndDelete({ CodeTicket: data[0].CodeTicket });
                res.status(200).json({
                    success: true,
                    message: 'Successfully deleted',
                });
            } else if (data.length > 1) {
                if (checkManyAdults(data)) {
                    await ticketDetail.findOneAndDelete({ CodeTicket: id });
                    res.status(200).json({
                        success: true,
                        message: 'Successfully deleted',
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        message: 'Chỉ có 1 người lớn nên không thể hủy vé',
                    });
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete. Try again ',
        });
    }
};

export const getTicketDetailByCodeTicket = async (req, res) => {
    const id = req.params.id;

    console.log(id);
    try {
        const ticketDetailSearch = await ticketDetail.find({ CodeTicketGeneral: id });

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: ticketDetailSearch,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getTicketDetailBySearchCodeTicket = async (req, res) => {
    const id = req.params.id;
    try {
        const ticketDetailSearch = await ticketDetail.find({ CodeTicket: id });

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: ticketDetailSearch,
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
        const ticketDetailSearch = await ticketDetail.find({ FlightNumber: id }, { ID_Card: 1 });

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: ticketDetailSearch,
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
        const ticketDetailSearch = await ticketDetail.find(
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
            data: ticketDetailSearch,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket

export const getAllticketDetail = async (req, res) => {
    try {
        const ticketDetail = await ticketDetail.find({});

        if (ticketDetail.length > 0) {
            res.status(200).json({
                success: true,
                count: ticketDetail.length,
                message: 'Successfully',
                data: ticketDetail,
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
