import express from 'express';
import {sanitize} from '../../../middleware/sanitizer';
import userController from './users.controller';
import {validateBody, schemas} from '../../../middleware/validator';
const userRouter = express.Router();
userRouter.route('/sign_up').post(sanitize(), validateBody(schemas.signUpSchema), userController.saveUserDetails);


export default userRouter;
