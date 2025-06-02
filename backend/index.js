import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import { GoogleAuth } from 'google-auth-library';

import ticketRoute from './routes/ticket.js';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import infoRoute from './routes/info.js';
import cancelRoute from './routes/cancel.js';
import sendEmailRoute from './routes/sendEmail.js';
import ticketDetailsRoute from './routes/ticketDetail.js';
import codeSeatRoute from './routes/codeSeat.js';
import loginRoute from './routes/login.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Google Gemini (PaLM) config
const SERVICE_ACCOUNT_PATH = process.env.GEMINI_SERVICE_ACCOUNT_PATH;
const PROJECT_ID = process.env.GEMINI_PROJECT_ID;
const LOCATION = process.env.GEMINI_LOCATION || 'us-central1';
const MODEL = process.env.GEMINI_MODEL || 'chat-bison-001';
const auth = new GoogleAuth({
    keyFilename: SERVICE_ACCOUNT_PATH,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

// Test endpoint
app.get('/', (req, res) => {
    res.send('API is working');
});

// Chat endpoint: proxy to Gemini API
app.post('/api/chat', async (req, res) => {
    const userText = req.body.text;
    if (!userText) {
        return res.status(400).json({ error: 'Missing text in request body' });
    }

    try {
        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        const endpoint =
            `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/` +
            `${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/` +
            `${MODEL}:predict`;

        const response = await axios.post(
            endpoint,
            { instances: [{ content: userText }] },
            {
                headers: {
                    Authorization: `Bearer ${accessToken.token || accessToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        const reply = response.data.predictions?.[0]?.candidates?.[0]?.content || 'Xin lỗi, mình không hiểu.';
        res.json({ reply });
    } catch (err) {
        console.error('Gemini API error:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to call Gemini API' });
    }
});

// Database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// Routes
app.use('/auth', authRoute);
app.use('/tickets', ticketRoute);
app.use('/users', userRoute);
app.use('/info', infoRoute);
app.use('/sendEmail', sendEmailRoute);
app.use('/login', loginRoute);
app.use('/ticketDetail', ticketDetailsRoute);
app.use('/codeSeat', codeSeatRoute);
app.use('/cancel', cancelRoute);

app.listen(port, () => {
    connect();
    console.log(`Server listening on port ${port}`);
});
