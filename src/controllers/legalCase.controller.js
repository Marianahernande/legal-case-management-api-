const legalCaseService = require('../services/legalCase.service');

class LegalCaseController {
  async create(req, res, next) {
    try {
      const legalCase = await legalCaseService.createLegalCase(req.body);

      return res.status(201).json({
        success: true,
        message: 'Legal case created successfully',
        data: legalCase,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10, status, lawyer_id } = req.query;

      const result = await legalCaseService.getAllLegalCases(
        page,
        limit,
        status,
        lawyer_id
      );

      return res.status(200).json({
        success: true,
        message: 'Legal cases retrieved successfully',
        data: result.legalCases,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const legalCase = await legalCaseService.getLegalCaseById(id);

      return res.status(200).json({
        success: true,
        message: 'Legal case retrieved successfully',
        data: legalCase,
      });
    } catch (error) {
      next(error);
    }
  }

  async assignLawyer(req, res, next) {
    try {
      const { id } = req.params;
      const { lawyer_id } = req.body;

      const legalCase = await legalCaseService.assignLawyer(id, lawyer_id);

      return res.status(200).json({
        success: true,
        message: 'Lawyer assigned successfully',
        data: legalCase,
      });
    } catch (error) {
      next(error);
    }
  }

  async transferCase(req, res, next) {
    try {
      const { id } = req.params;
      const { new_lawyer_id } = req.body;

      const result = await legalCaseService.transferCase(id, new_lawyer_id);

      return res.status(200).json({
        success: true,
        message: 'Case transferred successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LegalCaseController();