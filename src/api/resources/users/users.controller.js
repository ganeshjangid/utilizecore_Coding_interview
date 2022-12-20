import Logger from '../../../utils/winston-logger';
import {sendError, sendSuccess} from '../../../utils/response-handler';
import {ResMessage} from '../../../utils/res.message';
import {HttpResCode} from '../../../utils/http-res-code';
import {db} from '../../../models';

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
    }
}
