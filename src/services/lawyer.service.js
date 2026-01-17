const { Lawyer, LegalCase } = require('../models');
const { Op } = require('sequelize');

class LawyerService {
  async createLawyer(lawyerData) {
    const lawyer = await Lawyer.create(lawyerData);
    return lawyer;
  }

  async getAllLawyers(page = 1, limit = 10, status = null) {
    const offset = (page - 1) * limit;

    // Construir filtros
    const where = {};
    if (status) {
      where.status = status;
    }

    const { count, rows } = await Lawyer.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    return {
      lawyers: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getLawyerById(id) {
    const lawyer = await Lawyer.findByPk(id, {
      include: [
        {
          model: LegalCase,
          as: 'cases',
          attributes: ['id', 'caseNumber', 'plaintiff', 'defendant', 'status', 'caseType'],
        },
      ],
    });

    if (!lawyer) {
      throw new Error('Lawyer not found');
    }

    return lawyer;
  }
}

module.exports = new LawyerService();