const jwt = require("jsonwebtoken");

const userValidation = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        req.userId = decoded.userId;
        next();
      }
    );
  } catch (error) {
    res.status(401).json({ error: true, message: "Token validation failed" });
  }
};

module.exports = userValidation;
