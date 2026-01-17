'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('legal_cases', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      case_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      plaintiff: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      defendant: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      case_type: {
        type: Sequelize.ENUM('civil', 'criminal', 'labor', 'commercial'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'assigned', 'in_progress', 'resolved'),
        allowNull: false,
        defaultValue: 'pending',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      lawyer_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'lawyers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('legal_cases');
  },
};