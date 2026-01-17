
const { Lawyer, LegalCase } = require('../models');
const { Op } = require('sequelize');

class ReportService {
  async getLawyerCasesReport(lawyerId) {
    // Verificar que el abogado existe
    const lawyer = await Lawyer.findByPk(lawyerId);
    
    if (!lawyer) {
      const error = new Error('Lawyer not found');
      error.statusCode = 404;
      throw error;
    }

    //Obtener todos los casos del abogado
    const cases = await LegalCase.findAll({
      where: { lawyerId },
      order: [['createdAt', 'DESC']],
    });

    // Calcular estadísticas
    const statistics = {
      total_cases: cases.length,
      by_status: {
        assigned: cases.filter(c => c.status === 'assigned').length,
        in_progress: cases.filter(c => c.status === 'in_progress').length,
        resolved: cases.filter(c => c.status === 'resolved').length,
      },
      by_type: {
        civil: cases.filter(c => c.caseType === 'civil').length,
        criminal: cases.filter(c => c.caseType === 'criminal').length,
        labor: cases.filter(c => c.caseType === 'labor').length,
        commercial: cases.filter(c => c.caseType === 'commercial').length,
      },
    };

    return {
      lawyer: {
        id: lawyer.id,
        name: lawyer.name,
        email: lawyer.email,
        specialization: lawyer.specialization,
        status: lawyer.status,
      },
      statistics,
      cases: cases.map(c => ({
        id: c.id,
        caseNumber: c.caseNumber,
        plaintiff: c.plaintiff,
        defendant: c.defendant,
        caseType: c.caseType,
        status: c.status,
        createdAt: c.createdAt,
      })),
    };
  }
}

module.exports = new ReportService();