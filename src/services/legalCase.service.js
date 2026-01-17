const { LegalCase, Lawyer } = require('../models');
const { Op } = require('sequelize');

class LegalCaseService {
  async createLegalCase(caseData) {
    const legalCase = await LegalCase.create(caseData);
    return legalCase;
  }

  async getAllLegalCases(page = 1, limit = 10, status = null, lawyerId = null) {
    const offset = (page - 1) * limit;

    // Construir filtros
    const where = {};
    if (status) {
      where.status = status;
    }
    if (lawyerId) {
      where.lawyerId = lawyerId;
    }

    const { count, rows } = await LegalCase.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Lawyer,
          as: 'lawyer',
          attributes: ['id', 'name', 'email', 'specialization'],
        },
      ],
    });

    return {
      legalCases: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getLegalCaseById(id) {
    const legalCase = await LegalCase.findByPk(id, {
      include: [
        {
          model: Lawyer,
          as: 'lawyer',
          attributes: ['id', 'name', 'email', 'specialization', 'status'],
        },
      ],
    });

    if (!legalCase) {
      throw new Error('Legal case not found');
    }

    return legalCase;
  }

  async assignLawyer(caseId, lawyerId) {
    // Buscar el caso
    const legalCase = await LegalCase.findByPk(caseId);
    if (!legalCase) {
      const error = new Error('Legal case not found');
      error.statusCode = 404;
      throw error;
    }

    // Verificar que el abogado existe y está activo
    const lawyer = await Lawyer.findByPk(lawyerId);
    if (!lawyer) {
      const error = new Error('Lawyer not found');
      error.statusCode = 404;
      throw error;
    }

    if (lawyer.status !== 'active') {
      const error = new Error('Lawyer is not active');
      error.statusCode = 400;
      throw error;
    }

    // Verificar que el caso no esté ya asignado
    if (legalCase.lawyerId) {
      const error = new Error('Case is already assigned. Use transfer endpoint instead');
      error.statusCode = 400;
      throw error;
    }

    // Asignar el abogado y cambiar estado a "assigned"
    legalCase.lawyerId = lawyerId;
    legalCase.status = 'assigned';
    await legalCase.save();

    // Retornar con información del abogado
    return await LegalCase.findByPk(caseId, {
      include: [
        {
          model: Lawyer,
          as: 'lawyer',
          attributes: ['id', 'name', 'email', 'specialization'],
        },
      ],
    });
  }

  async transferCase(caseId, newLawyerId) {
    const { sequelize } = require('../models');
    
    // Iniciar transacción
    const transaction = await sequelize.transaction();

    try {
      // 1. Buscar el caso (con lock para evitar race conditions)
      const legalCase = await LegalCase.findByPk(caseId, {
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      if (!legalCase) {
        const error = new Error('Legal case not found');
        error.statusCode = 404;
        throw error;
      }

      // 2. Verificar que el caso esté asignado
      if (!legalCase.lawyerId) {
        const error = new Error('Case is not currently assigned to any lawyer');
        error.statusCode = 400;
        throw error;
      }

      // 3. Verificar que no sea el mismo abogado
      if (legalCase.lawyerId === newLawyerId) {
        const error = new Error('Case is already assigned to this lawyer');
        error.statusCode = 400;
        throw error;
      }

      // 4. Verificar que el abogado anterior existe
      const oldLawyer = await Lawyer.findByPk(legalCase.lawyerId, {
        transaction,
      });

      if (!oldLawyer) {
        const error = new Error('Current lawyer not found');
        error.statusCode = 404;
        throw error;
      }

      // 5. Verificar que el nuevo abogado existe y está activo
      const newLawyer = await Lawyer.findByPk(newLawyerId, {
        transaction,
      });

      if (!newLawyer) {
        const error = new Error('New lawyer not found');
        error.statusCode = 404;
        throw error;
      }

      if (newLawyer.status !== 'active') {
        const error = new Error('New lawyer is not active');
        error.statusCode = 400;
        throw error;
      }

      // 6. Realizar la transferencia
      const oldLawyerId = legalCase.lawyerId;
      legalCase.lawyerId = newLawyerId;
      await legalCase.save({ transaction });

      // 7. Commit de la transacción
      await transaction.commit();

      // 8. Retornar el caso actualizado con información de ambos abogados
      const updatedCase = await LegalCase.findByPk(caseId, {
        include: [
          {
            model: Lawyer,
            as: 'lawyer',
            attributes: ['id', 'name', 'email', 'specialization'],
          },
        ],
      });

      return {
        case: updatedCase,
        transfer: {
          from: {
            id: oldLawyerId,
            name: oldLawyer.name,
          },
          to: {
            id: newLawyer.id,
            name: newLawyer.name,
          },
        },
      };
    } catch (error) {
      // Si hay cualquier error, hacer rollback
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new LegalCaseService();