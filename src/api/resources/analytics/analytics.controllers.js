import Logger from '../../../utils/winston-logger';
import {sendError, sendSuccess} from '../../../utils/response-handler';
import {ResMessage} from '../../../utils/res.message';
import {HttpResCode} from '../../../utils/http-res-code';
import {db} from '../../../models';
const {QueryTypes} = require('sequelize');

export default {
    async getDetailsTop5Message(req, res) {
        Logger.info('== Start get Details Top 5 Message Group details==');
        try {
            const users = await db.sequelize.query("SELECT message, count(*) as total_count FROM `tbl_group_messages` GROUP BY message ORDER BY count(*) DESC LIMIT 5", {type: QueryTypes.SELECT});
            Logger.info('Group Created records=>' + JSON.stringify(users));
            return sendSuccess(req, res, ResMessage.SUCCESS, users, HttpResCode[200]);
        } catch (error) {
            Logger.error("Error in get Details Top 5 Message Group details ==>" + error);
            sendError(req, res, ResMessage.ERROR, error.status || HttpResCode[500])
        }
    },
    async getDetailsTop5UserMostMessageSend(req, res) {
        Logger.info('== Start get Details Top 5 User Most Message Send details==');
        try {
            const users = await db.sequelize.query("SELECT (select user_name from `tbl_users` where id = tbl_group_messages.user_id ) as user_id, chat_group_id ,count(*) as total_count FROM `tbl_group_messages` GROUP BY user_id ORDER BY count(*) DESC LIMIT 5", {type: QueryTypes.SELECT});
            Logger.info('Group Created records=>' + JSON.stringify(users));
            return sendSuccess(req, res, ResMessage.SUCCESS, users, HttpResCode[200]);
        } catch (error) {
            Logger.error("Error in get Details Top 5 User Most Message Send details ==>" + error);
            sendError(req, res, ResMessage.ERROR, error.status || HttpResCode[500])
        }
    },
    async getDetailsTopUserMostMessageSendDateRange(req, res) {
        Logger.info('== Start get Details Top User Most Message Send on date range details==');
        try {
            const {start, end} = req.query;
            const users = await db.sequelize.query(`SELECT (select user_name from tbl_users where id = tbl_group_messages.user_id ) as user_id, chat_group_id ,count(*) as total_count FROM tbl_group_messages where createdAt BETWEEN '${start}' AND '${end}' GROUP BY user_id ORDER BY count(*) DESC LIMIT 5`, {type: QueryTypes.SELECT});
            Logger.info('Group Created records=>' + JSON.stringify(users));
            return sendSuccess(req, res, ResMessage.SUCCESS, users, HttpResCode[200]);
        } catch (error) {
            Logger.error("Error in get Details Top User Most Message Send on date range  details ==>" + error);
            sendError(req, res, ResMessage.ERROR, error.status || HttpResCode[500])
        }
    }
}
