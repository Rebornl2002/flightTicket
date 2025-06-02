import express from 'express';
import { getAllAccounts, addAdmin, deleteAdmin, updateAdmin, getMyAccount } from '../controllers/loginController.js';

const router = express.Router();

router.get('/', getAllAccounts);

router.post('/addAmin', addAdmin);

router.delete('/:id', deleteAdmin);

router.put('/:id', updateAdmin);

router.get('/myaccount', getMyAccount);
export default router;
