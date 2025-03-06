import express from 'express';
import cors from 'cors';
// Database
import connectDatabase from './database/db.js';
// Routes
import userRouter from './routes/userRouter.js';

const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

// Routes
app.use('/api/users', userRouter);

const port = 8080;

app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
});
