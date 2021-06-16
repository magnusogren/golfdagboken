const Joi = require('joi'); //ändra namn till BaseJoi
// const sanitizeHtml = require('sanitize-html');

// const extension = (joi) => ({
//   type: 'string',
//   base: joi.string(),
//   messages: {
//     'string.escapeHTML': '{{#label}} must not include HTML!',
//   },
//   rules: {
//     escapeHTML: {
//       validate(value, helpers) {
//         const clean = sanitizeHtml(value, {
//           allowedTags: [],
//           allowedAttributes: {},
//         });
//         if (clean !== value) return helpers.error('string.escapeHTML', { value });
//         return clean;
//       },
//     },
//   },
// });

// const Joi = BaseJoi.extend(extension);

module.exports.golfrundaSchema = Joi.object({
  golfbana: Joi.object({
    datum: Joi.date().required(), //Kolla upp escapeHTML på några st.
    bana: Joi.string().required(), //Kolla upp escapeHTML på några st.
    antalHal: Joi.number().required().min(0).max(100),
    banansPar: Joi.number().min(0).max(100),
    tee: Joi.string(),
    langd: Joi.number().min(0),
    bruttoScore: Joi.number().min(0),
    nettoScore: Joi.number().min(0),
    poang: Joi.number().min(0),
    vader: Joi.string(),
    vindstyrka: Joi.number().min(0),
    temperatur: Joi.number().min(0),
    noteringar: Joi.string().required(),
    banansSkick: Joi.number().min(1).max(5),
    sammanfattningBetyg: Joi.number().min(1).max(5),
  }).required(),
});
