import fs from 'fs';
import path from 'path';
import { 
  Sequelize,
  DataTypes,
  Model
} from 'sequelize';

import Sign from './signatures';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const db: {
  [key: string]: any
} = {};

const storage = path.join(__dirname, '..', '..', 'database.db');

let sequelize: Sequelize;
sequelize = new Sequelize({
    "dialect": "sqlite",
    "logging": false,
    storage
});

db[Sign.name] = Sign(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
