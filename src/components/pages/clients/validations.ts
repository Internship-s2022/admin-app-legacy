import Joi from 'joi';

const clientValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(35)
    .trim()
    .messages({
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.max': 'El nombre debe tener máximo 35 caracteres',
      'string.empty': 'Este campo es requerido',
    })
    .required(),

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

  clientContact: Joi.string()
    .min(3)
    .max(35)
    .messages({
      'string.base': 'El contacto del cliente debe ser un string',
      'string.min': 'El contacto del cliente debe tener al menos 3 letras',
      'string.empty': 'Es requerido ingresar un contacto del cliente',
    })
    .required(),

  clientEmail: Joi.string()
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.empty': 'Email es un campo requerido',
      'string.min': 'Email debe contener al menos tres caracteres.',
    })
    .required(),

  relationshipStart: Joi.date().less('now').messages({
    'date.less': 'La fecha de inicio debe ser menor que la fecha actual',
  }),

  relationshipEnd: Joi.date().greater(Joi.ref('relationshipStart')).messages({
    'date.greater': 'Fecha de fin debe ser mayor a la fecha de inicio',
  }),

  notes: Joi.string().min(0).max(35).messages({
    'string.base': 'Notas tiene que ser un string',
    'string.min': 'Notes no debe contener más de  3 letras',
  }),
});

const updateClientValidation = Joi.object({
  name: Joi.string().max(35).messages({
    'string.base': 'El nombre del ciente debe ser un string',
    'string.min': 'El nombre  del cliente debe tener al menos 3 letras',
  }),

  localContact: Joi.string().min(3).max(35).messages({
    'string.base': 'El contacto de Radium Rocket debe ser un string',
    'string.min': 'El contacto de Radium Rocket debe contener al menos tres letras',
  }),

  localEmail: Joi.string()
    .regex(/^[a-zA-Z.]+@radiumrocket.com/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.min': 'Email debe contener al menos tres caracteres.',
    }),

  clientContact: Joi.string().min(3).max(35).messages({
    'string.base': 'El contacto del cliente debe ser un string',
    'string.min': 'El contacto del cliente debe tener al menos 3 letras',
  }),

  clientEmail: Joi.string()
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.min': 'Email debe contener al menos tres caracteres.',
    }),

  relationshipStart: Joi.date().less('now').messages({
    'date.less': 'La fecha de inicio debe ser menor que la fecha actual',
  }),

  relationshipEnd: Joi.date().greater(Joi.ref('relationshipStart')).messages({
    'date.greater': 'Fecha de fin debe ser mayor a la fecha de inicio',
  }),

  notes: Joi.string().min(0).max(35).messages({
    'string.base': 'Notas tiene que ser un string',
    'string.min': 'Notes no debe contener más de  3 letras',
  }),
});

export default {
  clientValidation,
};
