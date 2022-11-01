import Joi from 'joi';

import { RoleType } from '../../storybook/types';
import { Seniority } from '../types';

const editEmployeeValidations = Joi.object({
  skills: Joi.array().items(Joi.string().min(3).max(35)).messages({
    'string.min': 'Las skills deben contener mas de 3 letras',
    'string.max': 'Las skills deben contener menos de 35 letras',
    'string.base': 'Las skills deben ser una cadena de caracteres',
  }),

  seniority: Joi.string().valid(Seniority.JR, Seniority.SR, Seniority.SSR).messages({
    'any.only': 'El seniority debe ser JR, SR, SSR or TRAINEE',
  }),

  absences: Joi.array()
    .items(Joi.string())
    .messages({ 'string.base': 'Los items del array deben ser una cadena de caracteres' }),

  potentialRole: Joi.array().items(
    Joi.string()
      .valid(RoleType.DEV, RoleType.PM, RoleType.QA, RoleType.TL, RoleType.UI_UX)
      .messages({
        'any.only': 'El rol potencial debe ser DEV, QA, UI-UX, PM o TL',
        'string.base': 'Los items del array deben ser una cadena de caracteres',
      }),
  ),

  notes: Joi.string().min(0).max(499).messages({
    'string.max': 'Las notas deben contener menos de 500 caracteres',
    'string.base': 'Las notas deben ser una cadena de caracteres',
  }),

  careerPlan: Joi.string().min(0).max(499).messages({
    'string.max': 'El plan de carrera debe contener menos de 500 caracteres',
  }),
}).options({ allowUnknown: true });

export default editEmployeeValidations;
