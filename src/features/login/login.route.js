import express from 'express';
import { createUser, loginUser } from './login.controller.js';

const LoginRouter = express.Router();

LoginRouter.post('/create-user',createUser)
LoginRouter.post('/verify-user',loginUser)

export default LoginRouter;