import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    FlightNumber: {
        type: String,
        required: true,
        unique: true,
    },
    AirlineCode: {
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
    DateGo: {
        type: Date,
        default: Date('<YYYY-mm-dd>'),
        required: true,
    },
    FirstClass: {
        PriceAdult: {
            type: Number,
            required: true,
        },

        CodeSeat: {
            type: [String],
            default: [],
        },
    },
    BusinessClass: {
        PriceAdult: {
            type: Number,
            required: true,
        },

        CodeSeat: {
            type: [String],
            default: [],
        },
    },
    PremiumClass: {
        PriceAdult: {
            type: Number,
            required: true,
        },

        CodeSeat: {
            type: [String],
            default: [],
        },
    },
    EconomyClass: {
        PriceAdult: {
            type: Number,
            required: true,
        },

        CodeSeat: {
            type: [String],
            default: [],
        },
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
    Duration: {
        type: Number,
        default: 0,
    },
});

// // Define virtual property 'duration'
// ticketSchema.virtual("Duration").get(function () {
//   const flightTime = this.FlightTime.getTime();
//   const landingTime = this.LandingTime.getTime();
//   const durationInMinutes = Math.floor((landingTime - flightTime) / 60000);
//   return durationInMinutes;
// });

// // Ensure virtual properties are included when converting to JSON
// ticketSchema.set("toJSON", { virtuals: true });

ticketSchema.pre('save', function (next) {
    const flightTime = this.FlightTime.getTime();
    const landingTime = this.LandingTime.getTime();
    console.log('in ra cho bo xem nao', flightTime, landingTime);
    const durationInMinutes = Math.floor((landingTime - flightTime) / 60000);
    this.Duration = durationInMinutes;
    next();
});

export default mongoose.model('Ticket', ticketSchema);

// const ticket = await Ticket.findOne({ FlightNumber: "ABC123" });
// console.log("Duration:", ticket.duration);
