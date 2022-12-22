module.exports = (sequelize, Sequelize) => {
    const user_details = sequelize.define('tbl_users', {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        email_id: {
            type: Sequelize.STRING,
            defaultValue: ''
        }
    }, {
        indexes: [
            {
                name: "tbl_users",
                fields: ['id']
            },
        ]
    });
    user_details.associate = function (models) { // associations can be defined here
        models.tbl_users.hasMany(models.tbl_chat_groups, {
            as: "user_details",
            foreignKey: "owner"
        });

    };
    return user_details;
};
