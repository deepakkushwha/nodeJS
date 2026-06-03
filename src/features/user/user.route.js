import express from 'express';
import authMiddleware from '../../middleware/auth.middleware.js';
import {createUser, getUser, updateUser, deleteUser, getSingleUser } from './user.controller.js';
import isAdmin from '../../middleware/isAdmin.js';
import refreshAccessToken from '../../utils/refreshAccessToken.js';
import loginLimiter from '../../middleware/rateLimiter.js';

const userRoute = express.Router();
userRoute.post( '/refresh-token', refreshAccessToken );

userRoute.use(authMiddleware)
userRoute.post('/create', createUser);
userRoute.get('/getuser',isAdmin, loginLimiter, getUser);
userRoute.patch('/:id', updateUser);
userRoute.delete('/:id',deleteUser);
userRoute.get('/:id',getSingleUser);


export default userRoute;