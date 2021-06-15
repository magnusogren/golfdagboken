const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BilderSchema = new Schema({
  url: String,
  filename: String,
});

const GolfrundaSchema = new Schema({
  datum: Date,
  bana: String,
  antalHal: Number,
  banansPar: Number,
  tee: String,
  langd: String,
  bruttoScore: Number,
  nettoScore: Number,
  poang: Number,
  vader: String,
  vindstyrka: Number,
  temperatur: Number,
  noteringar: String,
  banansSkick: Number,
  sammanfattningBetyg: Number,
  bilder: [BilderSchema],
  spelare: String,
  medspelare: String,
  // spelare: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Anvandare',
  // },
  // medspelare: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Anvandare',
  // },
});

module.exports = mongoose.model('Golfrunda', GolfrundaSchema);
