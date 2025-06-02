import express from 'express';
import {
    createticketDetail,
    deleteticketDetail,
    getTicketDetailByCodeTicket,
    getAllticketDetail,
    getTicketDetailByFlightNumber,
    getTicketDetailByFlightNumberRoundTrip,
    getTicketDetailBySearchCodeTicket,
} from './../controllers/ticketDetailController.js';

const router = express.Router();

router.post('/', createticketDetail);

router.delete('/:id', deleteticketDetail);

router.get('/:id', getTicketDetailByCodeTicket);

router.get('/search/:id', getTicketDetailBySearchCodeTicket);

router.get('/', getAllticketDetail);

router.get('/flightNumber/:id', getTicketDetailByFlightNumber);

router.get('/flightNumberRoundTrip/:id', getTicketDetailByFlightNumberRoundTrip);

export default router;
