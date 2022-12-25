import Logger from '../../../utils/winston-logger';
import {sendError, sendSuccess} from '../../../utils/response-handler';
import {ResMessage} from '../../../utils/res.message';
import {HttpResCode} from '../../../utils/http-res-code';
import {db} from '../../../models';
import config from '../../../config';

// Pagination Details for all pages
let per_page = 3;
let sort = ['createdAt', 'DESC'];

// JWT Token Generate
import JWT from 'jsonwebtoken';
let JWTSign = function (user, date) {
    return JWT.sign({
        iss: config.app.name,
        sub: user.id,
        iat: date.getTime(),
        exp: new Date().setMinutes(date.getMinutes() + 30)
    }, config.app.secret);
}

export default {
    async saveUserDetails(req, res, next) {
        const {name, email_id} = req.body;
        Logger.info('== Start sign up customer details==');
        try { // Save or update records only return true (save) and false (update)
            let existRecords = await db.tbl_users.upsert({
                user_name: name,
                email_id
            }, {email_id: email_id});
            Logger.info('== Insert or Update records successfully(Save or update records only return true (save) and false (update))==', 'recordsUpdate=>' + existRecords);
            return sendSuccess(req, res, existRecords ? 'User Registered Successfully' : 'User Records updated Successfully', {}, HttpResCode[200]);

        } catch (error) {
            Logger.error("Error in saveCustomerDetails ==>" + error);
            sendError(req, res, ResMessage.ERROR, error.status || HttpResCode[500])
        }
    },
    async getAllUserDetails(req, res) {
        Logger.info('== Start getAllUserDetails service==');
        try {
            let start_page = req.query.start_page || 1;
            let list = await db.tbl_users.findAll({
                attributes: [
                    'id', 'user_name', 'email_id', 'createdAt'
                ],
                order: [sort],
                limit: per_page,
                offset: (start_page - 1) * per_page
            });

            // Generate JWT Token
            let date = new Date();
            let token = JWTSign(list[0], date);
            return sendSuccess(req, res, ResMessage.SUCCESS, {
                list: list,
                token: token
            }, HttpResCode[200]);

        } catch (error) {
            Logger.error("Error in getAllUserDetails service ==>" + error);
            sendError(req, res, ResMessage.ERROR, HttpResCode[500])
        }
    }
}
