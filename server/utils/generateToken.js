import jwt from "jsonwebtoken";

/**
 * Generate a signed JWT token for a user
 * @param {string} userId - MongoDB user ID
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
