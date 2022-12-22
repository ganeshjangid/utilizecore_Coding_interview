import express from 'express';
import {sanitize} from '../../../middleware/sanitizer';
import analyticsGroupController from './analytics.controllers';
const analyticsGroupRouter = express.Router();
analyticsGroupRouter.route('/top_5_message').get(sanitize(), analyticsGroupController.getDetailsTop5Message);
analyticsGroupRouter.route('/top_5_user_most_msg_send').get(sanitize(), analyticsGroupController.getDetailsTop5UserMostMessageSend);
analyticsGroupRouter.route('/top_user_most_msg_send_date_range').get(sanitize(), analyticsGroupController.getDetailsTopUserMostMessageSendDateRange);
export default analyticsGroupRouter;
