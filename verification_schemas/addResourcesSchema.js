'use strict';

const Joi = require('joi');

const addResourcesSchema = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().alphanum().required(),
    context: Joi.string().required(),
    iprange: Joi.array().items(Joi.string(), Joi.any().strip())
  }),
  Joi.object({
    name: Joi.string().alphanum().min(2).max(40).required(),
    context: Joi.string().required(),
    location: Joi.string()
  })
);

module.exports = addResourcesSchema;