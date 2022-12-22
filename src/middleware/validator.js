import Joi from 'joi';
import Logger from '../utils/winston-logger';
import {sendError} from '../utils/response-handler';

export let validateBody = (schema) => {
    return(req, res, next) => {

        let result = "";
        if (req.method !== 'GET') {
            result = schema.validate(req.body);
            Logger.info('==POST Request from client =' + JSON.stringify(req.body));
        } else {
            result = schema.validate(req.query);
            Logger.info('==GET Request from client=' + JSON.stringify(req.query));
        }
        if (result.error) {
            Logger.info('==Error in Request Data Invalid Parameter=' + result.error);
            return sendError(req, res, result.error.message, 400);
        }

        if (!req.value) {
            req.value = {};
        }
        req.value['body'] = result.value;
        next();
    }
}

export let schemas = {
    signUpSchema: Joi.object().keys(
        {
            name: Joi.string().required().error(new Error('Please Enter Name!')),
            email_id: Joi.string().email().required().error(new Error('Please Enter Email Id!'))
        }
    ),
    createChatGroupSchema: Joi.object().keys(
        {
            name: Joi.string().required().error(new Error('Please Enter Name!')),
            owner_id: Joi.number().required().error(new Error('Please Enter Owner Id!'))
        }
    ),
    updateChatGroupSchema: Joi.object().keys(
        {
            name: Joi.string().required().error(new Error('Please Enter Name!')),
            owner_id: Joi.number().required().error(new Error('Please Enter Owner Id!')),
            group_id: Joi.number().required().error(new Error('Please Enter Group Id!'))
        }
    ),
    memberAssignGroupSchema: Joi.object().keys(
        {
            user_id: Joi.number().required().error(new Error('Please Enter User Id!')),
            chat_group_id: Joi.number().required().error(new Error('Please Enter Group Id!'))
        }
    ),
    sendMessageGroupSchema: Joi.object().keys(
        {
            user_id: Joi.number().required().error(new Error('Please Enter User Id!')),
            group_id: Joi.number().required().error(new Error('Please Enter Group Id!')),
            text: Joi.string().required(),
            option: Joi.string().allow('')
        }
    )

}
