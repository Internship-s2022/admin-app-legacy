import { addYears } from 'date-fns';
import Joi from 'joi';

import { Role } from './types';

export const memberValidations = (startDate, endDate) => {
  const projectEndDate = endDate ?? addYears(new Date(), 77);
  return Joi.object({
    employee: Joi.object({
      value: Joi.string(),
      label: Joi.string(),
    })
      .messages({
        'any.required': 'Este campo es requerido',
        'string.empty': 'Este campo es requerido',
      })
      .required(),

    role: Joi.string()
      .valid(Role.DEV, Role.QA, Role.UX_UI, Role.TL, Role.PM)
      .messages({
        'any.only': 'El rol debe ser DEV, QA, UX/UI, TL o PM',
        'any.required': 'Este campo es requerido',
      })
      .required(),

    memberDedication: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .messages({
        'any.required': 'Este campo es requerido',
        'number.min': 'El porcentaje de dedicacion debe ser mayor a 0',
        'number.max': 'El porcentaje de dedicacion debe ser menor a 100',
        'number.base': 'Debe ingresar un número del 0 al 100',
      })
      .required(),

    helper: Joi.object({
      helperReference: Joi.object({
        value: Joi.string(),
        label: Joi.string(),
      })
        .messages({
          'any.required': 'Este campo es requerido',
          'string.empty': 'Este campo es requerido',
        })
        .required(),
      dependency: Joi.number()
        .integer()
        .min(0)
        .max(100)
        .messages({
          'number.min': 'El porcentaje de dependencia debe ser mayor a 0',
          'number.max': 'El porcentaje de dependencia debe ser menor a 100',
          'number.base': 'Debe ingresar un número del 0 al 100',
        })
        .required(),
      dedication: Joi.number()
        .integer()
        .min(0)
        .max(100)
        .messages({
          'any.required': 'Este campo es requerido',
          'number.min': 'El porcentaje de dedicacion debe ser mayor a 0',
          'number.max': 'El porcentaje de dedicacion debe ser menor a 100',
          'number.base': 'Debe ingresar un número del 0 al 100',
        })
        .required(),
    }),

    startDate: Joi.date()
      .min(new Date(startDate))
      .max(new Date(projectEndDate))
      .messages({
        'date.min': 'Fecha invalida. Revisar fechas del Proyecto',
        'date.max': 'Fecha invalida. Revisar fechas del Proyecto',
        'date.base': 'Este campo es requerido. Formato dd/mm/aaaa',
      })
      .allow(null),

    endDate: Joi.date()
      .min(Joi.ref('startDate'))
      .max(new Date(projectEndDate))
      .messages({
        'date.min': 'Fecha de finalización debe ser posterior a la fecha de inicio',
        'date.max': 'Fecha invalida. Revisar fechas del Proyecto',
        'date.base': 'Este campo es requerido. Formato dd/mm/aaaa',
      })
      .allow(null),
  }).options({ allowUnknown: true });
};
