import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

const db: { [key: string]: any } = {};

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASS || '',
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    retry: {
      match: [/Deadlock/i],
      max: 5,
      backoffBase: 100,
      backoffExponent: 1.1
    }
  }
);

const loadModels = () => {
  const modelFiles = fs.readdirSync(__dirname).filter(file => 
    file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js'
  );

  for (const file of modelFiles) {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  }
};

loadModels();

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize, Sequelize };
export default db;