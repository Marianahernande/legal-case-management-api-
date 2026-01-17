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
}

module.exports = new LegalCaseService();