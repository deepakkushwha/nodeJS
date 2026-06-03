import jwt from "jsonwebtoken";
import { generateAccessToken } from "./token.js";
import loginModel from "../features/login/login.model.js";

const refreshAccessToken = async (req, res) => {
    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh Token Missing"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            "REFRESH_SECRET"
        );

        const user = await loginModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const newAccessToken = generateAccessToken(user);

        res.status(200).json({
            message: "New Access Token Generated",
            accessToken: newAccessToken
        });

    } catch (err) {
        return res.status(401).json({
            message: "Invalid Refresh Token"
        });
    }
};

export default refreshAccessToken;
