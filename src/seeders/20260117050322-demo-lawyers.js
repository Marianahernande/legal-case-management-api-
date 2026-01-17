'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('lawyers', [
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        name: 'Carlos Pérez García',
        email: 'carlos.perez@bufete.com',
        phone: '+57 300 123 4567',
        specialization: 'Derecho Laboral',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        name: 'María González López',
        email: 'maria.gonzalez@bufete.com',
        phone: '+57 310 234 5678',
        specialization: 'Derecho Civil',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        name: 'Juan Rodríguez Martínez',
        email: 'juan.rodriguez@bufete.com',
        phone: '+57 320 345 6789',
        specialization: 'Derecho Penal',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        name: 'Ana Martínez Silva',
        email: 'ana.martinez@bufete.com',
        phone: '+57 330 456 7890',
        specialization: 'Derecho Comercial',
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        name: 'Pedro Sánchez Ruiz',
        email: 'pedro.sanchez@bufete.com',
        phone: '+57 340 567 8901',
        specialization: 'Derecho Laboral',
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lawyers', null, {});
  },
};