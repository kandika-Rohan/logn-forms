import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Forbidden: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to req object
        next(); // Proceed to next middleware/controller
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
