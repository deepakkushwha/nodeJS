import Login from './login.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '../../utils/token.js';

const createUser = async (req, res) => {
    try {
        const { email, mobile, password, role } = req.body;

        const hasedPassword = await bcrypt.hash(password, 10)
        const user = await Login.create({
            email,
            mobile,
            role,
            password: hasedPassword
        })

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user,

        })
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({
                message: 'user already exists'
            });
        }

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: Object.values(err.errors)[0].message
            });
        }

        return res.status(500).json({
            message: err.message
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Login.findOne({ email })
        
        if (!user) {
            return res.status(400).json({
                message: "User not Exist"
            })
        }

        const isMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatched) {
            return res.status(500).json({
                message: "Invalid credentials"
            })
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            accessToken,
            refreshToken
        });


    } catch (err) {

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: Object.values(err.errors)[0].message
            });
        }

        return res.status(500).json({
            message: err.message
        });
    }
}

export { createUser, loginUser };