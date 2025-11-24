import express from 'express';
import * as sessionController from '../controllers/SessionController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.patch('/:id', sessionController.update);
router.post('/:id/attachments', sessionController.uploadAttachment);

export default router;
