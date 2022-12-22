module.exports = (sequelize, Sequelize) => {
    const group_message = sequelize.define('tbl_group_message', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.BIGINT,
            defaultValue: 0
        },
        chat_group_id: {
            type: Sequelize.BIGINT,
            defaultValue: 0
        },
        message: {
            type: Sequelize.TEXT,
            defaultValue: ''
        },
        sender_receiver: {
            type: Sequelize.STRING,
            defaultValue: 'receive',
            ENUM: ('send', 'receive')
        }
    }, {
        indexes: [
            {
                name: "tbl_group_message",
                fields: ['id', 'user_id', 'chat_group_id']
            },
        ]
    });
    group_message.associate = function (models) { // associations can be defined here
        models.tbl_group_message.belongsTo(models.tbl_chat_members, {
            as: 'chat_member_details',
            foreignKey: 'chat_group_id',
            sourceKey: 'chat_group_id'
        });
    };
    return group_message;
};
