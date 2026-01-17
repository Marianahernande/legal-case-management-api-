'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LegalCase extends Model {
    static associate(models) {
      // Un caso pertenece a un abogado
      LegalCase.belongsTo(models.Lawyer, {
        foreignKey: 'lawyerId',
        as: 'lawyer',
      });
    }
  }
  
  LegalCase.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    caseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'case_number',
    },
    plaintiff: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    defendant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseType: {
      type: DataTypes.ENUM('civil', 'criminal', 'labor', 'commercial'),
      allowNull: false,
      field: 'case_type',
    },
    status: {
      type: DataTypes.ENUM('pending', 'assigned', 'in_progress', 'resolved'),
      allowNull: false,
      defaultValue: 'pending',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lawyerId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'lawyer_id',
    },
  }, {
    sequelize,
    modelName: 'LegalCase',
    tableName: 'legal_cases',
    underscored: true,
    timestamps: true,
  });
  
  return LegalCase;
};