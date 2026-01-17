module.exports = {
  // Roles de usuario
  USER_ROLES: {
    ADMIN: 'admin',
    OPERATOR: 'operator',
  },

  // Estados de abogados
  LAWYER_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },

  // Tipos de casos
  CASE_TYPES: {
    CIVIL: 'civil',
    CRIMINAL: 'criminal',
    LABOR: 'labor',
    COMMERCIAL: 'commercial',
  },

  // Estados de casos
  CASE_STATUS: {
    PENDING: 'pending',
    ASSIGNED: 'assigned',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
  },

  // Paginación
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
};