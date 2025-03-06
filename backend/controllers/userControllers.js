import User from '../models/User.js';

export const userLoginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Received login data:', req.body);

        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(404).send({ message: "Invalid username or password" });
        }

        res.status(200).send({ message: "Login successful", user });
    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).send("Server error");
    }
};

export const userSignUpController = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        console.log("Received data:", req.body);

        // Create a new user instance
        const user = new User({ username, password });
        console.log("Saving user:", user);

        // Save user to database
        await user.save();
        
        res.status(201).send({ message: "Signup successful", user });

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
        email: user.email, // Include email if relevant
      }));
  
      res.status(200).json(formattedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: err.message });
    }
};
