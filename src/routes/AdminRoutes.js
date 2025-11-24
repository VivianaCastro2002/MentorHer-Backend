import express from 'express';
import * as adminController from '../controllers/AdminController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(authenticate);
// Add admin check middleware here if needed

router.get('/users', adminController.getUsers);
router.patch('/mentors/:id/capacity', adminController.updateMentorCapacity);
router.get('/support-tickets', adminController.getSupportTickets);
router.patch('/support-tickets/:id', adminController.updateSupportTicket);

export default router;
