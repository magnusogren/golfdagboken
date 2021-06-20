const { golfrundaSchema, omdomeSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Golfrunda = require('./models/golfrunda');

module.exports.valideraGolfrunda = (req, res, next) => {
  const { error } = golfrundaSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.valideraOmdome = (req, res, next) => {
  const { error } = omdomeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.arInloggad = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // req.flash('error', 'You must be signed in');
    return res.redirect('/loggain');
  }
  next();
};

module.exports.arSpelare = async (req, res, next) => {
  const { id } = req.params;
  const golfrunda = await Golfrunda.findById(id);
  console.log(golfrunda.spelare);
  if (req.user._id === undefined || !golfrunda.spelare.equals(req.user._id)) {
    // req.flash('error', 'permission denied');
    return res.redirect(`/golfbanor`);
  }
  next();
};
