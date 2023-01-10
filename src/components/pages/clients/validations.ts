import Joi from 'joi';

const clientValidation = (clientNameValidation, id) => {
  return Joi.object({
    name: Joi.string()
      .min(3)
      .max(35)
      .trim()
      .custom((value, helper) => {
        if (!id && value && clientNameValidation) {
          return helper.error('any.invalid');
        }
      })
      .messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre debe tener máximo 35 caracteres',
        'string.empty': 'Este campo es requerido',
        'any.invalid': 'Cliente ya registrado',
      })
      .required(),

    localContact: Joi.object({
      name: Joi.string()
        .min(3)
        .max(35)
        .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
        .trim()
        .messages({
          'string.min': 'El nombre debe contener al menos 3 letras',
          'string.empty': 'Este campo es requerido',
          'string.max': 'El nombre debe tener máximo 35 letras',
          'string.pattern.base': 'El nombre debe contener solo letras',
        })
        .required(),
      email: Joi.string()
        .regex(/^[a-zA-Z]+\.+[a-zA-Z]+@(radiumrocket.com)$/)
        .min(20)
        .trim()
        .messages({
          'string.empty': 'Este campo es requerido',
          'string.min': 'El email debe contener al menos 3 letras',
          'string.pattern.base': 'Formato de email no es válido',
        })
        .required(),
    }),

    clientContact: Joi.object({
      name: Joi.string()
        .min(3)
        .max(35)
        .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
        .trim()
        .messages({
          'string.min': 'El nombre debe contener al menos 3 letras',
          'string.empty': 'Este campo es requerido',
          'string.max': 'El nombre debe tener máximo 35 letras',
          'string.pattern.base': 'El nombre debe contener solo letras',
        })
        .required(),

      email: Joi.string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .trim()
        .messages({
          'string.empty': 'Este campo es requerido',
          'string.min': 'El email debe contener al menos 3 letras',
          'string.pattern.base': 'Formato de email no es válido',
        })
        .required(),
    }),

    relationshipStart: Joi.date().allow(null).messages({
      'date.base': 'Formato dd/mm/aaaa',
    }),

    relationshipEnd: Joi.date()
      .greater(Joi.ref('relationshipStart'))
      .messages({
        'date.greater': 'Fecha de fin debe ser mayor a la fecha de inicio',
        'date.base': 'Formato dd/mm/aaaa',
      })
      .allow(null),

    notes: Joi.string().min(0).max(35).messages({
      'string.base': 'Notas tiene que ser un string',
      'string.min': 'Notes no debe contener más de  3 letras',
    }),
  }).options({ allowUnknown: true });
};

export default {
  clientValidation,
};
