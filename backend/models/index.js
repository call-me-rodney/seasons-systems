'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../configs/configs';

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(configs.database.url, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: configs.database.ssl
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
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

export default db;
