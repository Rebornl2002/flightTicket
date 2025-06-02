import InfoBooked from '../models/infoBooked.js';
import moment from 'moment';

//Create infoBooked

export const createInfoBooked = async (req, res) => {
    const newInfoBooked = new InfoBooked(req.body);
    try {
        const saveInfoBooked = await newInfoBooked.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveInfoBooked,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

//update ticket

export const updateInfoBooked = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedInfoBooked = await InfoBooked.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedInfoBooked,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

//delete ticket

export const deleteInfoBooked = async (req, res) => {
    const id = req.params.id;
    try {
        await InfoBooked.findByIdAndDelete(id);

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

export const deleteInfoBookedByCodeSeat = async (req, res) => {
    const id = req.params.id;
    try {
        await InfoBooked.findOneAndDelete({ CodeTicket: id });

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

export const getSingleInfoBooked = async (req, res) => {
    const id = req.params.id;
    try {
        const infoBooked = await InfoBooked.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: infoBooked,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket

export const getAllInfoBooked = async (req, res) => {
    //for pagination
    // const page = parseInt(req.query.page);
    //

    try {
        const infoBooked = await InfoBooked.find({});
        //     .skip(page * 5)
        //     .limit(5);

        if (infoBooked.length > 0) {
            res.status(200).json({
                success: true,
                count: infoBooked.length,
                message: 'Successfully',
                data: infoBooked,
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

//getAll ticket Oneway

export const getAllInfoBookedOneway = async (req, res) => {
    //for pagination
    // const TypeFlight = new RegExp(req.query.TypeFlight, 'i');

    try {
        const infoBooked = await InfoBooked.find({
            TypeFlight: { $eq: 'Oneway' },
        });

        if (infoBooked.length > 0) {
            res.status(200).json({
                success: true,
                count: infoBooked.length,
                message: 'Successfully',
                data: infoBooked,
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

//getAll ticket Roundtrip

export const getAllInfoBookedRoundtrip = async (req, res) => {
    //for pagination
    const TypeFlight = new RegExp(req.query.TypeFlight, 'i');

    try {
        const infoBooked = await InfoBooked.find({
            // TypeFlight: 'Roundtrip',
            TypeFlight: { $eq: 'Roundtrip' },
        });
        //     .skip(page * 5)
        //     .limit(5);

        if (infoBooked.length > 0) {
            res.status(200).json({
                success: true,
                count: infoBooked.length,
                message: 'Successfully',
                data: infoBooked,
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

//get All ticket oneway of each company
export const getAllInfoBookedOnewayOfCompany = async (req, res) => {
    const flightNumber = new RegExp(req.query.FlightNumber, 'i');

    try {
        const infoBooked = await InfoBooked.find({
            TypeFlight: { $eq: 'Oneway' },
            FlightNumber: flightNumber,
        });

        if (infoBooked.length > 0) {
            res.status(200).json({
                success: true,
                count: infoBooked.length,
                message: 'Successfully',
                data: infoBooked,
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

//get All ticket oneway of each company

export const getAllInfoBookedRoundtripOfCompany = async (req, res) => {
    const flightNumber = new RegExp(req.query.FlightNumber, 'i');
    const flightNumberReturn = new RegExp(req.query.FlightNumberReturn, 'i');

    try {
        const infoBooked = await InfoBooked.find({
            TypeFlight: { $eq: 'Roundtrip' },
            $or: [{ FlightNumber: flightNumber }, { FlightNumberReturn: flightNumberReturn }],
        });

        if (infoBooked.length > 0) {
            res.status(200).json({
                success: true,
                count: infoBooked.length,
                message: 'Successfully',
                data: infoBooked,
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

//get ticket by search code ticket
export const getInfoBookedBySearch = async (req, res) => {
    //here 'i' means case sensitive

    // const codeTicket = new RegExp(req.query.CodeTicket);
    // const CodeTicket = new RegExp(req.query);

    const codeTicket = new RegExp(`^${req.query.CodeTicket}$`);

    try {
        const InfoBookeds = await InfoBooked.find({
            // CodeTicket: { $eq: CodeTicket },
            CodeTicket: codeTicket,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found booked',
        });
    }
};

const getMonth = () => {
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setMonth(currentMonthStart.getMonth() + 0, 0);
    currentMonthStart.setHours(0, 0, 0, 0);

    const currentMonthEnd = new Date();
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1, 0);
    currentMonthEnd.setHours(23, 59, 59, 999);

    return {
        currentMonthStart: currentMonthStart,
        currentMonthEnd: currentMonthEnd,
    };
};

export const getInfoBookedMonthNow = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);

    const currentMonthStart = getMonth().currentMonthStart;
    const currentMonthEnd = getMonth().currentMonthEnd;

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTime: { $gte: currentMonthStart, $lt: currentMonthEnd },
        });

        //

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};
export const getInfoBookedMonthOnewayNow = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);
    const TypeFlight = new RegExp(req.query.TypeFlight, 'i');

    const currentMonthStart = getMonth().currentMonthStart;
    const currentMonthEnd = getMonth().currentMonthEnd;

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTime: { $gte: currentMonthStart, $lt: currentMonthEnd },
            TypeFlight: { $eq: 'Oneway' },
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getInfoBookedMonthRoundtripNow = async (req, res) => {
    const LandingTime = new Date(req.query.LandingTime);
    const TypeFlight = new RegExp(req.query.TypeFlight, 'i');

    const currentMonthStart = getMonth().currentMonthStart;
    const currentMonthEnd = getMonth().currentMonthEnd;

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTime: { $gte: currentMonthStart, $lt: currentMonthEnd },
            TypeFlight: { $eq: 'Roundtrip' },
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getInfoBookedCompany = async (req, res) => {
    const flightNumber = new RegExp(req.query.FlightNumber, 'i');
    const LandingTime = new Date(req.query.LandingTime);

    const currentMonthStart = getMonth().currentMonthStart;
    const currentMonthEnd = getMonth().currentMonthEnd;

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTime: { $gte: currentMonthStart, $lt: currentMonthEnd },
            FlightNumber: flightNumber,
        });

        //

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

const getMonth_11_2023 = (start) => {
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setMonth(currentMonthStart.getMonth() + 0, 0);
    currentMonthStart.setHours(0, 0, 0, 0);

    const currentMonthEnd = new Date();
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1, 0);
    currentMonthEnd.setHours(23, 59, 59, 999);

    return {
        currentMonthStart: currentMonthStart,
        currentMonthEnd: currentMonthEnd,
    };
};

// dday
export const getInfoBookedMonthOnewayAndCompanyNow = async (req, res) => {
    const flightNumber = new RegExp(req.query.FlightNumber, 'i');
    const { month, year } = req.query;

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTime: { $gte: startOfMonth, $lt: endOfMonth },
            FlightNumber: flightNumber,
            TypeFlight: 'Oneway',
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        });
    }
};

export const fetchAPIRoundtripAndCompanyAndDateGoThisMonth = async (req, res) => {
    const flightNumber = new RegExp(req.query.FlightNumber, 'i');
    const { month, year } = req.query;

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTime: { $gte: startOfMonth, $lt: endOfMonth },
            FlightNumber: flightNumber,
            TypeFlight: { $eq: 'Roundtrip' },
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const fetchAPIRoundtripAndCompanyAndDateReturnThisMonth = async (req, res) => {
    const flightNumber = new RegExp(req.query.FlightNumber, 'i');
    const { month, year } = req.query;

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    try {
        const InfoBookeds = await InfoBooked.find({
            LandingTimeReturn: { $gte: startOfMonth, $lt: endOfMonth },
            FlightNumberReturn: flightNumber,
            TypeFlight: { $eq: 'Roundtrip' },
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const fetchAPICancelInfoTicket = async (req, res) => {
    const codeTicket = new RegExp(`^${req.query.CodeTicket}$`);
    const flightNumber = new RegExp(`^${req.query.FlightNumber}$`);
    const email = new RegExp(`^${req.query.Email}$`);

    const id_Card = new RegExp(`^${req.query.ID_Card}$`);
    const userName = new RegExp(`^${req.query.UserName}$`);

    // ra nào:', codeTicket, flightNumber, email, id_Card, userName);

    try {
        const InfoBookeds = await InfoBooked.find({
            CodeTicket: codeTicket,
            FlightNumber: flightNumber,
            Email: email,
            ID_Card: id_Card,
            UserName: userName,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: InfoBookeds.length,
            data: InfoBookeds,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};
