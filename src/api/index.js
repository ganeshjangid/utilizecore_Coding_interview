import express from 'express';
import userRouter from './resources/users'

export const restRouter = express.Router();
restRouter.use('/users', userRouter);
