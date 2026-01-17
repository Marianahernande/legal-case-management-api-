'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedAdminPassword = await bcrypt.hash('Admin123!', 10);
    const hashedOperatorPassword = await bcrypt.hash('Oper123!', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        username: 'admin',
        password: hashedAdminPassword,
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        username: 'operator',
        password: hashedOperatorPassword,
        role: 'operator',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};