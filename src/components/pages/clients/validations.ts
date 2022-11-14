import Joi from 'joi';

const clientValidation = Joi.object({
  name: Joi.string().min(3).max(35).required().trim().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre debe tener máximo 35 caracteres',
    'string.empty': 'Este campo es requerido',
  }),

  localContact: Joi.object({
    name: Joi.string()
      .min(3)
      .max(35)
      .regex(/^[a-zA-Z\s]*$/)
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
      .regex(/^[a-zA-Z\s]*$/)
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

  relationshipStart: Joi.date()
    .less('now')
    .messages({
      'date.less': 'La fecha de inicio debe ser anterior a la fecha actual',
    })
    .allow(null),

  relationshipEnd: Joi.date()
    .greater(Joi.ref('relationshipStart'))
    .messages({
      'date.greater': 'Fecha de fin debe ser posterior a la fecha de inicio',
    })
    .allow(null), //TO DO: revisar componente. Tira error -en inglés- cuando el campo esta vacío.
}).options({ allowUnknown: true });

export default {
  clientValidation,
};
