import mongoose from 'mongoose';

const CreditCard = new mongoose.Schema({
    issuer: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    expiryMonth: {
        type: String,
        required: true,
    },
    expiryYear: {
        type: String,
        required: true,
    },
    exp: {
        type: String,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
});

export default mongoose.model('CreditCard', CreditCard);
