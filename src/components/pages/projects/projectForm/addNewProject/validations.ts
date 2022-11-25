import Joi from 'joi';

import { CriticalType, ProjectType } from './types';

export const projectValidation = Joi.object({
  clientName: Joi.string()
    .messages({
      'any.required': 'Este campo es requerido',
      'string.empty': 'Este campo es requerido',
    })
    .required(),

  projectName: Joi.string()
    .min(3)
    .max(35)
    .trim()
    .messages({
      'any.required': 'Este campo es requerido',
      'string.min': 'El nombre debe contener al menos 3 caracteres',
      'string.max': 'El nombre no debe contener más de 35 caracteres',
      'string.empty': 'Este campo es requerido',
    })
    .required(),

  description: Joi.string()
    .max(100)
    .messages({
      'string.max': 'La descripción no debe contener más de 100 caracteres',
    })
    .allow(''),

  startDate: Joi.date().allow(null),

  endDate: Joi.date()
    .greater(Joi.ref('startDate'))
    .messages({
      'date.greater': 'La fecha de finalización debe ser posterior a la fecha de inicio',
    })
    .allow(null),

  isCritic: Joi.string()
    .valid(CriticalType.ALTA, CriticalType.MEDIA, CriticalType.BAJA)
    .messages({
      'any.only': 'La criticidad debe ser Alta, Media o Baja',
      'any.required': 'Este campo es requerido',
    })
    .required(),

  projectType: Joi.string()
    .valid(ProjectType.PRODUCT_BUILDING, ProjectType.STAFF_AUGMENTATION)
    .required()
    .messages({
      'any.only': 'El tipo de proyecto debe ser Product Building o Staff Augmentation',
      'any.required': 'Este campo es requerido',
    }),
}).options({ allowUnknown: true });
