import express from 'express';
import * as supportController from '../controllers/SupportController.js';
// const authenticate = require('../middleware/auth.middleware'); // Optional if support can be anonymous

const router = express.Router();

router.post('/', supportController.createTicket);

export default router;
