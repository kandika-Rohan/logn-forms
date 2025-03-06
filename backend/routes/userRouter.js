import express from "express";
import User from '../models/User.js';


const Router=express.Router();

Router.post('/login', (req, res) => {

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

Router.post('/signup', (req, res) => {

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

Router.get("/allusers", async (req, res) => {
    try {
        const users = await User.find();

        const formattedUsers = users.map(user => ({
            name: user.username,     
            password: user.password 
        }));

        res.json(formattedUsers);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default Router;