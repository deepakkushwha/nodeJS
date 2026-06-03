import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        "JWT_SECRET",
        {
            expiresIn: "20d"
        }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        "REFRESH_SECRET",
        {
            expiresIn: "7d"
        }
    );
};