import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define user model
const User = mongoose.model('User', { username: String, password: String });

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' folder
app.use(express.static('public'));

const port = 8080;

app.get("/", (req, res) => {
    res.send("<h1>Hello Rohan, how are you?</h1>");
});


//post response for the client signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    console.log('Received data:', req.body);

    const user = new User({ username, password });
    console.log('Saving user:', user);

    user.save()
        .then(() => {
            res.status(201).send("Signup is successful");
        })
        .catch((err) => {
            console.error('Error saving user:', err);
            res.status(500).send("Server error");
        });
});


//post response for checking if user exists or not
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login data:', req.body);

    User.findOne({ username, password })
        .then(user => {
            if (user) {
                res.status(200).send({ message: 'Login successful', user });
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        })
        .catch(err => {
            console.error('Error finding user:', err);
            res.status(500).send("Server error");
        });
});



app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
});
