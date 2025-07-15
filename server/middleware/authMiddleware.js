import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded object to req.user (just ID here)
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
