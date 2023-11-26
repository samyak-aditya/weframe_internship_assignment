// index.js
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes.js';
import dotenv from 'dotenv'

const app = express();
const port = 5000;

dotenv.config()
// Connect to MongoDB
mongoose.connect(process.env.mongoURL, {
  
  
});

// Check MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
app.use(express.json());
// Set up basic route
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
