module.exports = (sequelize, Sequelize) => {
    const chat_group = sequelize.define('tbl_chat_groups', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        owner: {
            type: Sequelize.BIGINT,
            defaultValue: 0
        }
    }, {
        indexes: [
            {
                name: "tbl_chat_groups",
                fields: ['id']
            },
        ]
    });
    chat_group.associate = function (models) { // associations can be defined here
        models.tbl_chat_groups.hasMany(models.tbl_chat_members, {
            as: "chat_group_details",
            foreignKey: "chat_group_id"
        });
        models.tbl_chat_groups.belongsTo(models.tbl_users, {
            as: "user_details",
            foreignKey: 'id',
            sourceKey: 'owner'
        });
    };
    return chat_group;
};
