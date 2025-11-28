import express from 'express';
import * as mentorshipController from '../controllers/MentorshipController.js';
import * as sessionController from '../controllers/SessionController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', mentorshipController.getAll);
router.post('/:id/termination', mentorshipController.terminate);

// Note: Sessions are nested under mentorships in the contract: /mentorships/:id/sessions
// But also /sessions/:id exists.
// I will handle the nested part here or in index.js.
// The contract has:
// GET /mentorships/:id/sessions
// POST /mentorships/:id/sessions
// PATCH /sessions/:id
// POST /sessions/:id/attachments

// I'll add the nested routes here directly or delegate.
router.get('/:id/sessions', sessionController.getByMentorshipId);
router.post('/:id/sessions', sessionController.create);

export default router;
