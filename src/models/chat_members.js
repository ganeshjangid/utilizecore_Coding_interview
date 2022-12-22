module.exports = (sequelize, Sequelize) => {
    const chat_member = sequelize.define('tbl_chat_members', {
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
        }
    }, {
        indexes: [
            {
                name: "tbl_chat_members",
                fields: ['id', 'user_id', 'chat_group_id']
            },
        ]
    });
    chat_member.associate = function (models) { // associations can be defined here
        models.tbl_chat_members.belongsTo(models.tbl_chat_groups, {
            as: 'chat_member_details',
            foreignKey: 'chat_group_id'
        });
        models.tbl_chat_members.hasMany(models.tbl_group_message, {
            as: "chat_group_message",
            foreignKey: 'chat_group_id',
            sourceKey: 'chat_group_id'
        });
    };
    return chat_member;
};
