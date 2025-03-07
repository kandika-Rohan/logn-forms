import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

dotenv.config();

export const userLoginController = async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({
          msg: "Login successful",
          userId: user._id,
          token
      });

  } catch (err) {
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Server error" });
  }
};

  

export const userSignUpController = async (req, res) => {
  try {
    const { email,username, password } = req.body;

    
    // Create a new user instance

    const existingUser = await User.findOne({ email });

    if (existingUser)

      return res.status(400).json({ message: "User already exists" });
    
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });


    console.log("Saving user:", newUser);

    // Save user to database
    await newUser.save();

    res.status(201).send({ message: "Signup successful"});

  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send({ message: "Server error", error: err.message });
  }
};

export const allUsersController = async (req, res) => {
  try {
    const users = await User.find({}, "username email");

    // Format user data
    const formattedUsers = users.map((user) => ({
      username: user.username,
      email: user.email,
    }));

    res.status(200).json(formattedUsers);

  } catch (err) {

    console.error("Error fetching users:", err);

    res.status(500).json({ error: err.message });
  }
};


