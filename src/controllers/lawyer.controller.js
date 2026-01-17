const lawyerService = require('../services/lawyer.service');

class LawyerController {
  async create(req, res, next) {
    try {
      const lawyer = await lawyerService.createLawyer(req.body);

      return res.status(201).json({
        success: true,
        message: 'Lawyer created successfully',
        data: lawyer,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10, status } = req.query;

      const result = await lawyerService.getAllLawyers(page, limit, status);

      return res.status(200).json({
        success: true,
        message: 'Lawyers retrieved successfully',
        data: result.lawyers,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const lawyer = await lawyerService.getLawyerById(id);

      return res.status(200).json({
        success: true,
        message: 'Lawyer retrieved successfully',
        data: lawyer,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LawyerController();