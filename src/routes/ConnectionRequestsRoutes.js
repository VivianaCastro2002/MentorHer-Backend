import express from 'express';
import * as connectionRequestController from '../controllers/ConnectionRequestController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', connectionRequestController.getAll);
router.post('/', connectionRequestController.create);
router.patch('/:id', connectionRequestController.updateStatus);

export default router;
