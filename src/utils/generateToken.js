import jwt from "jsonwebtoken";

const generateEmailToken = (user) => {
  return jwt.sign(
    { id: user._id },
    "JWT_EMAIL_SECRET",
    { expiresIn: "15m" }
  );
};

export default generateEmailToken;