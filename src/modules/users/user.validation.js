const Joi = require('joi');

const updatePreferencesSchema = Joi.object({
  categories: Joi.array().items(Joi.string()),
  language: Joi.string().length(2),
  sources: Joi.array().items(Joi.string())
});

module.exports = {
  updatePreferencesSchema
};