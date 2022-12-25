import JWT from "jsonwebtoken";
import Logger from "../utils/winston-logger";
import {ResMessage} from '../utils/res.message';
import {HttpResCode} from '../utils/http-res-code';
import {sendError} from '../utils/response-handler';
import config from "../config";
export const Auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    Logger.info('== Token Check by JWT service==');
    if (! token) {
        Logger.error('Access denied. No token provided');
        sendError(req, res, ResMessage.AUTH_TOKEN_NOT_EXIST, HttpResCode[401]);
    }
    try {
        JWT.verify(token, config.app.secret);
        Logger.info('== Token valid==');
        next();
    } catch (error) {
        sendError(req, res, ResMessage.AUTH_TOKEN_INVALID, HttpResCode[401]);
    }

}
