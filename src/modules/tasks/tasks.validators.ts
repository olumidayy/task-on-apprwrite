import { celebrate, Joi } from 'celebrate';

export const NewTaskValidator = celebrate(
  {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      category: Joi.string(),
      deadline: Joi.date(),
    },
  },
  { stripUnknown: true },
);

export const UpdateTaskValidator = celebrate(
  {
    body: {
      title: Joi.string(),
      description: Joi.string(),
      category: Joi.string(),
      status: Joi.allow('PENDING', 'IN_PROGRESS', 'DONE'),
      deadline: Joi.date(),
    },
  },
  { stripUnknown: true },
);
