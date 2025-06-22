import express from 'express';
import {
    checkCreditCard,
    payTicket,
    payTicketRoundTrip,
    payTicketConnect,
    deleteResourceWithRollback,
} from './../controllers/creditCardController.js';

const router = express.Router();

router.post('/check', checkCreditCard);

router.post('/pay', payTicket);

router.post('/payRoundTrip', payTicketRoundTrip);

router.post('/payConnect', payTicketConnect);

router.delete('/cancel/:id', deleteResourceWithRollback);
export default router;
