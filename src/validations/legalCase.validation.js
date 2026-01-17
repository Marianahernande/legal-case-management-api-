const Joi = require('joi');

const createLegalCaseSchema = Joi.object({
  caseNumber: Joi.string().required().messages({
    'string.empty': 'Case number is required',
  }),
  plaintiff: Joi.string().required().messages({
    'string.empty': 'Plaintiff is required',
  }),
  defendant: Joi.string().required().messages({
    'string.empty': 'Defendant is required',
  }),
  caseType: Joi.string()
    .valid('civil', 'criminal', 'labor', 'commercial')
    .required()
    .messages({
      'any.only': 'Case type must be: civil, criminal, labor, or commercial',
      'string.empty': 'Case type is required',
    }),
  status: Joi.string()
    .valid('pending', 'assigned', 'in_progress', 'resolved')
    .default('pending'),
  description: Joi.string().optional().allow(null, ''),
  lawyerId: Joi.string().uuid().optional().allow(null),
});

const assignLawyerSchema = Joi.object({
  lawyer_id: Joi.string().uuid().required().messages({
    'string.empty': 'Lawyer ID is required',
    'string.guid': 'Lawyer ID must be a valid UUID',
  }),
});

const transferCaseSchema = Joi.object({
  new_lawyer_id: Joi.string().uuid().required().messages({
    'string.empty': 'New lawyer ID is required',
    'string.guid': 'New lawyer ID must be a valid UUID',
  }),
});

module.exports = {
  createLegalCaseSchema,
  assignLawyerSchema,
  transferCaseSchema,
};