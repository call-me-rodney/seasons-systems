import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../configs/configs.js';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(configs.database.url, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: configs.database.ssl
});

async function initializeModels() {
  const files = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js'
      );
    });

  // First, load all models (define them with sequelize.define)
  for (const file of files) {
    const model = await import(pathToFileURL(path.join(__dirname, file)));
    const modelInstance = model.default(sequelize, Sequelize.DataTypes);
    db[modelInstance.name] = modelInstance;
  }

  // Then, call associate for each model after all models are loaded
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db; // Return the populated db object
}

// Export a promise that resolves with the db object
export default initializeModels();
