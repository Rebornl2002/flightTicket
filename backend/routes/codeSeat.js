import express from 'express';
import {
    createCodeSeat,
    deleteCodeSeat,
    getAllCodeSeat,
    updateCodeSeat,
    getCodeSeatById,
    updateCodeSeatPayingFail,
    updateCodeSeatRoundTrip,
} from './../controllers/codeSeatController.js';

const router = express.Router();

router.post('/', createCodeSeat);

router.delete('/:id', deleteCodeSeat);

router.get('/', getAllCodeSeat);

router.put('/:id', updateCodeSeat);

router.put('/roundTrip/:id', updateCodeSeatRoundTrip);

router.put('/fail/:id', updateCodeSeatPayingFail);

router.get('/:id', getCodeSeatById);

export default router;
