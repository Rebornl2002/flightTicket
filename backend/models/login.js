import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
    AccountName: {
        type: String,
        unique: true,
        required: true,
    },
    Password: {
        type: String,
        require: true,
    },
    Name: {
        type: String,
    },
    DayOfBirth: {
        type: Date,
    },
    Role: {
        type: String,
        require: true,
    },
});

export default mongoose.model('Login', loginSchema);
