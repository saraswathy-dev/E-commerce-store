import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import { connectDB } from './lib/db.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Required for parsing JSON in POST requests
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});


// Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
  connectDB();
});
