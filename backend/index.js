import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//database
import connectDatabase from './database/db.js';
//routes 
import userRouter from './routes/userRouter.js';


const app = express();

// Connect to MongoDB
connectDatabase();
// Use CORS middleware to allow cross-origin requests
app.use(cors());
// Middleware to parse JSON bodies and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const port = 8080;


// app.get("/", (req, res) => {
//     res.send("<h1>Hello Rohan, how are you?</h1>");
// });

app.use('/api/users',userRouter);

app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
});
