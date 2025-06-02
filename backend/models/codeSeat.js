import mongoose from 'mongoose';

const CodeSeat = new mongoose.Schema({
    FlightNumber: {
        type: String,
        required: true,
        unique: true,
    },
    FirstClass: {
        type: [String],
        default: [],
    },
    BusinessClass: {
        type: [String],
        default: [],
    },
    PremiumClass: {
        type: [String],
        default: [],
    },
    EconomyClass: {
        type: [String],
        default: [],
    },
});

export default mongoose.model('CodeSeat', CodeSeat);
