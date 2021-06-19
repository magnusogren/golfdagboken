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
	golfrunda: Joi.object({
		datum: Joi.date().required(), //Kolla upp escapeHTML på några st.
		bana: Joi.string().required(), //Kolla upp escapeHTML på några st.
		antalHal: Joi.number().required().min(0).max(100),
		banansPar: Joi.number().min(0).max(100).allow('', null),
		tee: Joi.string(),
		langd: Joi.number().min(0).allow('', null),
		bruttoScore: Joi.number().min(0).allow('', null),
		nettoScore: Joi.number().min(0).allow('', null),
		poang: Joi.number().min(0),
		vader: Joi.string().allow('', null),
		vindstyrka: Joi.number().min(0).allow('', null),
		temperatur: Joi.number().min(0).allow('', null),
		noteringar: Joi.string().required(),
		medspelare: Joi.string().allow('', null),
		url: Joi.string().allow('', null),
		banansSkick: Joi.number().min(1).max(5).allow('', null),
		sammanfattningBetyg: Joi.number().min(1).max(5)
	}).required()
});

module.exports.omdomeSchema = Joi.object({
	omdome: Joi.object({
		betyg: Joi.number().min(1).max(5), //Kolla upp escapeHTML på några st.
		text: Joi.string().required() //Kolla upp escapeHTML på några st.
	}).required()
});
