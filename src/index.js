import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import Routes
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UsersRoutes.js';
import mentorRoutes from './routes/MentorsRoutes.js';
import connectionRequestRoutes from './routes/ConnectionRequestsRoutes.js';
import mentorshipRoutes from './routes/MentorshipsRoutes.js';
import sessionRoutes from './routes/SessionsRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import supportRoutes from './routes/SupportRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/mentors', mentorRoutes);
app.use('/connection-requests', connectionRequestRoutes);
app.use('/mentorships', mentorshipRoutes);
app.use('/sessions', sessionRoutes);
app.use('/admin', adminRoutes);
app.use('/support-tickets', supportRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('MentorHer Backend API is running');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});