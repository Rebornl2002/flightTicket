import mongoose from 'mongoose';

const cancelSchema = new mongoose.Schema({
    Customer: {
        type: String,
        require: true,
    },
    CodeTicket: {
        type: String,
        require: true,
    },
    FlightNumber: {
        type: String,
        require: true,
    },
    ID_Card: {
        type: String,
    },
    Phone: {
        type: String,
    },
    UserName: {
        type: String,
        require: true,
    },
    Email: {
        type: String,
    },
    ID_Info: {
        type: String,
        require: true,
        unique: true,
    },
});

export default mongoose.model('Cancel', cancelSchema);
