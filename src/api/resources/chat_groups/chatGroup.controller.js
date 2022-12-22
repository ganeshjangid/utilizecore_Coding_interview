import Logger from '../../../utils/winston-logger';
import {sendError, sendSuccess} from '../../../utils/response-handler';
import {ResMessage} from '../../../utils/res.message';
import {HttpResCode} from '../../../utils/http-res-code';
import {db} from '../../../models';

export default {
    async createChatGroup(req, res) {
        const {name, owner_id} = req.body;
        Logger.info('== Start Create Chat Group details==');
        try {
            const existingUser = await db.tbl_users.findOne({
                where: {
                    id: owner_id
                },
                paranoid: false,
                attributes: ['id']
            });
            if (! existingUser) {
                Logger.error('== User Does not exist ==');
                return sendError(req, res, ResMessage.USER_NOT_EXIST, HttpResCode[404])
            }
            const groupCreate = await db.tbl_chat_groups.create({name: name, owner: existingUser.id});
            Logger.info('Group Created records=>' + JSON.stringify(groupCreate));
            return sendSuccess(req, res, 'Group Created Successfully', {}, HttpResCode[201]);

        } catch (error) {
            Logger.error("Error in Creating Chat Group ==>" + error);
            sendError(req, res, ResMessage.ERROR, error.status || HttpResCode[500])
        }
    },
    async updateChatGroup(req, res) {
        const {name, owner_id, group_id} = req.body;
        Logger.info('== Start update Chat Group details==');
        try {
            const existingUser = await db.tbl_users.findOne({
                where: {
                    id: owner_id
                },
                paranoid: false,
                attributes: ['id']
            });
            if (! existingUser) {
                Logger.error('== User Does not exist ==');
                return sendError(req, res, ResMessage.USER_NOT_EXIST, HttpResCode[404])
            }

            const updateGroup = await db.tbl_chat_groups.update({
                name: name
            }, {
                where: {
                    owner: existingUser.id,
                    id: group_id
                }
            });
            if (! updateGroup) {
                Logger.error('== failed to update Group Details in tbl_chat_groups table ==');
                return sendError(req, res, ResMessage.USER_NOT_EXIST, HttpResCode[404])
            }
            return sendSuccess(req, res, 'Group Updated Successfully', {}, HttpResCode[201]);

        } catch (error) {
            Logger.error("Error in Updating Chat Group ==>" + error);
            sendError(req, res, ResMessage.ERROR, error.status || HttpResCode[500])
        }
    },
    async memberAssignChatGroup(req, res) {
        const {chat_group_id, user_id} = req.body;
        Logger.info('== Start Member Assign to Chat Group details==');
        try {
            const existingUser = await db.tbl_users.findOne({
                where: {
                    id: user_id
                },
                paranoid: false,
                attributes: ['id']
            });
            if (! existingUser) {
                Logger.error('== User Does not exist ==');
                return sendError(req, res, ResMessage.USER_NOT_EXIST, HttpResCode[404])
            }

            const existingGroup = await db.tbl_chat_groups.findOne({
                where: {
                    id: chat_group_id
                },
                paranoid: false,
                attributes: ['id']
            });
            if (! existingGroup) {
                Logger.error('== Group Does not exist ==');
                return sendError(req, res, ResMessage.GROUP_NOT_EXIST, HttpResCode[404])
            }

            const memberAssingToGroup = await db.tbl_chat_members.create({user_id, chat_group_id});
            Logger.info('Member Assing To Group records=>' + JSON.stringify(memberAssingToGroup));
            return sendSuccess(req, res, 'Member Assign To Group', memberAssingToGroup, HttpResCode[201]);

        } catch (error) {
            Logger.error("Error in Member assign Chat Group ==>" + error);
            sendError(req, res, ResMessage.ERROR, error.status || HttpResCode[500])
        }
    },
    async getAllGroupDetails(req, res) {
        Logger.info('== Start getAllGroupDetails service==');
        try {
            const {chat_group_id} = req.query;
            const list = await db.tbl_chat_groups.findAll({
                where: {
                    id: chat_group_id
                },
                attributes: [
                    'name', 'createdAt',
                ],
                include: [
                    {
                        model: db.tbl_users,
                        as: 'user_details',
                        attributes: ['user_name']
                    }, {
                        model: db.tbl_chat_members,
                        as: 'chat_group_details',
                        attributes: ['user_id']
                    }

                ]
            });

            return sendSuccess(req, res, ResMessage.SUCCESS, list, HttpResCode[200]);

        } catch (error) {
            Logger.error("Error in getAllGroupDetails service ==>" + error);
            sendError(req, res, ResMessage.ERROR, HttpResCode[500])
        }
    },
    async sendMessageChatGroup(req, res) {
        Logger.info('== Start sendMessageChatGroup service==');
        try {
            const {user_id, group_id, text, option} = req.body;
            const existingUser = await db.tbl_users.findOne({
                where: {
                    id: user_id
                },
                paranoid: false,
                attributes: ['id']
            });
            if (! existingUser) {
                Logger.error('== User Does not exist ==');
                return sendError(req, res, ResMessage.USER_NOT_EXIST, HttpResCode[404])
            }

            const existingGroup = await db.tbl_chat_groups.findOne({
                where: {
                    id: group_id
                },
                paranoid: false,
                attributes: ['id']
            });
            if (! existingGroup) {
                Logger.error('== Group Does not exist ==');
                return sendError(req, res, ResMessage.GROUP_NOT_EXIST, HttpResCode[404])
            }

            const sendMessageGroup = await db.tbl_group_message.create({
                user_id,
                chat_group_id: group_id,
                message: text,
                sender_receiver: option || 'receive'

            });
            Logger.info('Send Message to Group Records =>' + JSON.stringify(sendMessageGroup));


            return sendSuccess(req, res, ResMessage.GROUP_MSG_SEND, {}, HttpResCode[201]);

        } catch (error) {
            Logger.error("Error in sendMessageChatGroup service ==>" + error);
            sendError(req, res, ResMessage.ERROR, HttpResCode[500])
        }
    },
    async getAllGroupMessageDetails(req, res) {
        Logger.info('== Start getAllGroupMessageDetails service==');
        try {
            const list = await db.tbl_group_message.findAll({
                attributes: [
                    'id',
                    'user_id',
                    'chat_group_id',
                    'message',
                    'sender_receiver',
                    'createdAt'
                ]
            });
            return sendSuccess(req, res, ResMessage.SUCCESS, list, HttpResCode[200]);

        } catch (error) {
            Logger.error("Error in getAllGroupMessageDetails service ==>" + error);
            sendError(req, res, ResMessage.ERROR, HttpResCode[500])
        }
    }
}
