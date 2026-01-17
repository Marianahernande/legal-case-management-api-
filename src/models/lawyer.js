'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    static associate(models) {
      // Un abogado tiene muchos casos
      Lawyer.hasMany(models.LegalCase, {
        foreignKey: 'lawyerId',
        as: 'cases',
      });
    }
  }
  
  Lawyer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Valida que sea un email válido
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  }, {
    sequelize,
    modelName: 'Lawyer',
    tableName: 'lawyers',
    underscored: true,
    timestamps: true,
  });
  
  return Lawyer;
};