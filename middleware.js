const { golfrundaSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');

module.exports.valideraGolfrunda = (req, res, next) => {
  const { error } = golfrundaSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
