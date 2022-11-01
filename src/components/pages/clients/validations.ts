import Joi from 'joi';

const createClientValidation = Joi.object({
  name: Joi.string().max(35).required().messages({
    'string.base': 'El nombre del ciente debe ser un string',
    'string.min': 'El nombre  del cliente debe tener al menos 3 letras',
    'string.empty': 'Nombre del cliente es un campo requerido',
  }),

  localContact: Joi.string()
    .min(3)
    .max(35)
    .messages({
      'string.base': 'El contacto de Radium Rocket debe ser un string',
      'string.min': 'El contacto de Radium Rocket debe contener al menos tres letras',
      'string.empty': 'Es requerido ingresar un contacto de Radium Rocket',
    })
    .required(),

  localEmail: Joi.string()
    .regex(/^[a-zA-Z.]+@radiumrocket.com/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.empty': 'Email es un campo requerido',
      'string.min': 'Email debe contener al menos tres caracteres.',
    })
    .required(),

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
  createClientValidation,
  updateClientValidation,
};
