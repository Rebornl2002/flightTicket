import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//user registration
const enterInfo = async (req, res) => {
    try {
        const newUser = new User({
            Username: req.body.Username,
            DayOfBirth: req.body.DayOfBirth,
            Email: req.body.Email,
            Address: req.body.Address,
            ID_Card: req.body.ID_Card,
            Phone: req.body.Phone,
            Sessions: req.body.Sessions,
        });

        await newUser.save();
        res.status(200).json({ success: true, message: 'Success created' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create. Try again' + error });
    }
};

export default enterInfo;
