import express from 'express';
import * as userController from '../controllers/UserController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/me', userController.getMe);
router.patch('/me', userController.updateMe);
router.get('/me/files', userController.getMyFiles);

export default router;
