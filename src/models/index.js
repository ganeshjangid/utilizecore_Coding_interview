import {readdirSync} from 'fs';
import path, {basename as _basename} from 'path';
import Sequelize from 'sequelize';
import config from '../config';

const basename = _basename(__filename);
const db = {};

let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.connection,
    logging: false,
    underscored: true,
    pool: {
        max: 20,
        min: 1,
        idle: 20000,
        acquire: 1000000
    },
    timestamps: true
});

readdirSync(__dirname).filter(file => {
    return(file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {
    db
};
