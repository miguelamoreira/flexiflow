import dbConfig from '../config/db.config.js';
import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
   },
    dialectOptions: dbConfig.dialectOptions,
    logging: console.log
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
})();

import UsersModel from './Users.model.js';
import ExercisesModel from './Exercises.model.js';
import CategoriesModel from './Categories.model.js';

const db = {};
db.sequelize = sequelize
db.Users = UsersModel(sequelize, DataTypes);
db.Exercises = ExercisesModel(sequelize, DataTypes);
db.Categories = CategoriesModel(sequelize, DataTypes);

export default db;