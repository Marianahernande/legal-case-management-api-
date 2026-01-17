'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero obtenemos los IDs de los abogados activos
    const lawyers = await queryInterface.sequelize.query(
      `SELECT id FROM lawyers WHERE status = 'active' LIMIT 3;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const lawyerId1 = lawyers[0]?.id;
    const lawyerId2 = lawyers[1]?.id;
    const lawyerId3 = lawyers[2]?.id;

    await queryInterface.bulkInsert('legal_cases', [
      // Casos pendientes (sin asignar)
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-001',
        plaintiff: 'Empresa ABC S.A.S.',
        defendant: 'Juan Pérez',
        case_type: 'labor',
        status: 'pending',
        description: 'Demanda por despido injustificado',
        lawyer_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-002',
        plaintiff: 'María López',
        defendant: 'Banco XYZ',
        case_type: 'civil',
        status: 'pending',
        description: 'Reclamación por cobro indebido',
        lawyer_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-003',
        plaintiff: 'Estado Colombiano',
        defendant: 'Carlos Ramírez',
        case_type: 'criminal',
        status: 'pending',
        description: 'Proceso por fraude',
        lawyer_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Casos asignados
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-004',
        plaintiff: 'Comercio DEF Ltda',
        defendant: 'Proveedor GHI',
        case_type: 'commercial',
        status: 'assigned',
        description: 'Incumplimiento de contrato',
        lawyer_id: lawyerId1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-005',
        plaintiff: 'Ana García',
        defendant: 'Empresa JKL',
        case_type: 'labor',
        status: 'in_progress',
        description: 'Acoso laboral',
        lawyer_id: lawyerId1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-006',
        plaintiff: 'Pedro Martínez',
        defendant: 'Vecino MNO',
        case_type: 'civil',
        status: 'in_progress',
        description: 'Conflicto de linderos',
        lawyer_id: lawyerId2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-007',
        plaintiff: 'Fiscalía',
        defendant: 'Luis Torres',
        case_type: 'criminal',
        status: 'in_progress',
        description: 'Delito contra el patrimonio',
        lawyer_id: lawyerId2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-008',
        plaintiff: 'Sociedad PQR',
        defendant: 'Socio STU',
        case_type: 'commercial',
        status: 'resolved',
        description: 'Disolución de sociedad',
        lawyer_id: lawyerId3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-009',
        plaintiff: 'Trabajador VWX',
        defendant: 'Empresa YZA',
        case_type: 'labor',
        status: 'resolved',
        description: 'Liquidación de prestaciones',
        lawyer_id: lawyerId3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: queryInterface.sequelize.fn('gen_random_uuid'),
        case_number: 'CASE-2025-010',
        plaintiff: 'Cliente BCD',
        defendant: 'Proveedor EFG',
        case_type: 'civil',
        status: 'assigned',
        description: 'Daños y perjuicios',
        lawyer_id: lawyerId1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('legal_cases', null, {});
  },
};