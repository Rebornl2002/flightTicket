import mongoose from 'mongoose';

const ticketDetail = new mongoose.Schema(
    {
        TypeFlight: {
            type: String,
            required: true,
        },
        TypeTicket: {
            type: String,
            required: true,
        },
        AirportFrom: {
            type: String,
            required: true,
        },
        AirportTo: {
            type: String,
            required: true,
        },
        FlightTime: {
            type: Date,
            default: Date('<YYYY-mm-ddTHH:MM>'),
            required: true,
        },
        LandingTime: {
            type: Date,
            default: Date('<YYYY-mm-ddTHH:MM>'),
            required: true,
        },
        DateGo: {
            type: Date,
            default: Date('<YYYY-mm-dd>'),
            required: true,
        },

        TotalMoney: {
            type: Number,
            required: true,
        },
        CodeTicket: {
            type: String,
            required: true,
        },
        CodeTicketGeneral: {
            type: String,
            required: true,
        },
        FlightNumber: {
            type: String,
            required: true,
            // unique: true,
        },
        UserName: {
            type: String,
            required: true,
        },
        ID_Card: {
            type: String,
        },
        CodeSeat: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
        },

        TypeTicketReturn: {
            type: String,
        },
        FlightNumberReturn: {
            type: String,
        },
        FlightTimeReturn: {
            type: Date,
            // default: Date("<YYYY-mm-ddTHH:MM>"),
        },
        LandingTimeReturn: {
            type: Date,
            // default: Date("<YYYY-mm-ddTHH:MM>"),
        },
        CodeSeatReturn: {
            type: String,
        },
        DateReturn: {
            type: Date,
            // default: Date("<YYYY-mm-dd>"),
        },
    },
    // { timestamps: Date.getTime() }
);

export default mongoose.model('ticketDetail', ticketDetail);
