const reportService = require('../services/report.service');

class ReportController {
  async getLawyerCases(req, res, next) {
    try {
      const { id } = req.params;

      const report = await reportService.getLawyerCasesReport(id);

      return res.status(200).json({
        success: true,
        message: 'Report generated successfully',
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();