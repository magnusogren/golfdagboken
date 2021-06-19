const { number } = require('joi');
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
  tee: {
    type: {
      type: String,
      enum: ['Gul', 'Röd'],
    },
  },
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
  // bilder: [BilderSchema],
  url: String,
  // spelare: String,
  medspelare: String,
  spelare: {
    type: Schema.Types.ObjectId,
    ref: 'Anvandare',
  },
  betyg: Number,
  text: String,

  // medspelare: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Anvandare',
  // },
});

module.exports = mongoose.model('Golfrunda', GolfrundaSchema);
