import express from 'express';
import * as mentorController from '../controllers/MentorController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', mentorController.getAll);
router.get('/:id', mentorController.getById);

export default router;
