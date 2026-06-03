import express from 'express';
import userRoute from './features/user/user.route.js'
import LoginRouter from './features/login/login.route.js';
import errorHandler from './utils/errorHandler.js';

const app = express();
app.use(errorHandler);
app.use(express.json());
app.use('/api/user',userRoute)
app.use('/api/login',LoginRouter)

export default app;