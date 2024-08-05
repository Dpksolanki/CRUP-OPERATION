'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServicePriceOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ServicePriceOption.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
    }
  }
  ServicePriceOption.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    duration: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    type: DataTypes.STRING,
    serviceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServicePriceOption',
  });
  return ServicePriceOption;
};