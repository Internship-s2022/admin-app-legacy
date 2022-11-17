import Joi from 'joi';

import { Role } from './types';

export const memberValidations = Joi.object({
  employee: Joi.string()
    .messages({
      'any.required': 'Este campo es requerido',
      'string.empty': 'Este campo es requerido',
    })
    .required(),

  projectType: Joi.string()
    .valid(Role.DEV, Role.QA, Role.UX_UI, Role.TL, Role.PM)
    .messages({
      'any.only': 'El rol debe ser DEV, QA, UX/UI, TL o PM',
      'any.required': 'Este campo es requerido',
    })
    .required(),

  memberDedication: Joi.number()
    .min(0)
    .max(100)
    .messages({
      'any.required': 'Este campo es requerido',
      'number.min': 'El porcentaje de dedicacion debe ser mayor a 0',
      'number.max': 'El porcentaje de dedicacion debe ser menor a 100',
    })
    .required(),

  helper: Joi.string()
    .messages({
      'any.required': 'Este campo es requerido',
      'string.empty': 'Este campo es requerido',
    })
    .required(),

  dependency: Joi.number()
    .min(0)
    .max(100)
    .messages({
      'any.required': 'Este campo es requerido',
      'number.min': 'El porcentaje de dependencia debe ser mayor a 0',
      'number.max': 'El porcentaje de dependencia debe ser menor a 100',
    })
    .required(),

  helperDedication: Joi.number()
    .min(0)
    .max(100)
    .messages({
      'any.required': 'Este campo es requerido',
      'number.min': 'El porcentaje de dedicacion debe ser mayor a 0',
      'number.max': 'El porcentaje de dedicacion debe ser menor a 100',
    })
    .required(),

  startDate: Joi.date(),

  endDate: Joi.date().greater(Joi.ref('startDate')).messages({
    'date.greater': 'La fecha de finalización debe ser posterior a la fecha de inicio',
  }),
}).options({ allowUnknown: true });
