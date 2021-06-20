const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OmdomeSchema = new Schema({
  text: String,
  betyg: Number,
  spelare: {
    type: Schema.Types.ObjectId,
    ref: 'Anvandare',
  },
});

module.exports = mongoose.model('Omdome', OmdomeSchema);
