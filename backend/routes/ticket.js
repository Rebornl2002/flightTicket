import express from 'express';
import {
    createTicket,
    deleteTicket,
    updateTicket,
    getSingleTicket,
    getAllTicket,
    getTicketBySearch,
    getTicketBySearchCompany,
    getTicketBySearchDuration,
    getTicketBySearchCompanyAndDuration,
    getTicketByTodayOfCompany,
    getTicketCompletedAll,
    getTicketIncompletedAll,
    getTicketCompletedMonthNowOfCompany,
    getTicketIncompletedMonthNowOfCompany,
    getAllTicketOfCompany,
    searchConnectingFlights,
} from './../controllers/ticketController.js';

const router = express.Router();

//create new ticket
router.post('/', createTicket);

//get all ticket
router.get('/', getAllTicket);

//get all ticket by search
router.get('/search/getTicketBySearch', getTicketBySearch);

//get all ticket by search company
router.get('/search/getTicketBySearchCompany', getTicketBySearchCompany);

//get all ticket by search duration
router.get('/search/getTicketBySearchDuration', getTicketBySearchDuration);

//get all ticket by search company and duration
router.get('/search/getTicketBySearchCompanyAndDuration', getTicketBySearchCompanyAndDuration);

//get all ticket by today
router.get('/search/getTicketByTodayOfCompany', getTicketByTodayOfCompany);

//get all ticket completed
router.get('/search/getTicketCompletedAll', getTicketCompletedAll);

//get all ticket incompleted
router.get('/search/getTicketIncompletedAll', getTicketIncompletedAll);

//get all ticket completed in month now of each company
router.get('/search/getTicketCompletedMonthNowOfCompany', getTicketCompletedMonthNowOfCompany);

//get all ticket incompleted in month now of each company
router.get('/search/getTicketIncompletedMonthNowOfCompany', getTicketIncompletedMonthNowOfCompany);

//get all ticket of each company
router.get('/search/getAllTicketOfCompany', getAllTicketOfCompany);

router.get('/search/connect', searchConnectingFlights);

//delete new ticket
router.delete('/:id', deleteTicket);

//update new ticket
router.put('/:id', updateTicket);

router.patch('/:id', updateTicket);

//get single ticket
router.get('/:id', getSingleTicket);

export default router;
