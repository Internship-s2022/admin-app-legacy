import { addYears } from 'date-fns';
import Joi from 'joi';

import { CriticalType, ProjectType } from './types';

export const projectValidation = (startDate, endDate) => {
  const relationshipStart = startDate ? new Date(startDate) : new Date();
  const relationshipEnd = endDate ? new Date(endDate) : addYears(new Date(), 77);

  return Joi.object({
    clientName: Joi.string()
      .regex(/^[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ'&-/ ]*$/)
      .messages({
        'any.required': 'Este campo es requerido',
        'string.empty': 'Este campo es requerido',
        'string.pattern.base': 'El nombre debe contener solo letras y numeros',
      })
      .required(),

    projectName: Joi.string()
      .min(3)
      .max(35)
      .regex(/^[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ'&-/ ]*$/)
      .trim()
      .messages({
        'any.required': 'Este campo es requerido',
        'string.min': 'El nombre debe contener al menos 3 caracteres',
        'string.max': 'El nombre no debe contener más de 35 caracteres',
        'string.empty': 'Este campo es requerido',
        'string.pattern.base': 'El nombre debe contener solo letras y numeros',
      })
      .required(),

    description: Joi.string()
      .max(100)
      .messages({
        'string.max': 'La descripción no debe contener más de 100 caracteres',
      })
      .allow(''),

    startDate: Joi.date()
      .min(relationshipStart)
      .max(relationshipEnd)
      .messages({
        'date.min': 'Fecha invalida. Revisar fechas del Cliente',
        'date.max': 'Fecha invalida. Revisar fechas del Cliente',
        'date.base': 'Este campo es requerido. Formato dd/mm/aaaa',
      })
      .allow(null),

    endDate: Joi.date()
      .min(Joi.ref('startDate'))
      .max(relationshipEnd)
      .messages({
        'date.min': 'Fecha de finalización debe ser posterior a la fecha de inicio',
        'date.max': 'Fecha invalida. Revisar fechas del Cliente',
        'date.base': 'Este campo es requerido. Formato dd/mm/aaaa',
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
};
