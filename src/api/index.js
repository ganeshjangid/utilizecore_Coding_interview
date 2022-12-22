import express from 'express';
import userRouter from './resources/users'
import chatGroupRouter from "./resources/chat_groups";
import analyticsGroupRouter from './resources/analytics';

export const restRouter = express.Router();
restRouter.use('/users', userRouter);
restRouter.use('/chat/group', chatGroupRouter);
restRouter.use('/analytics', analyticsGroupRouter);
