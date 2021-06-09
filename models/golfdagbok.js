const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BilderSchema = new Schema({
  url: String,
  filename: String,
});

const GolfdagbokSchema = new Schema(
  {
    datum: Date,
    bana: String,
    antalHal: Number,
    banansPar: Number,
    tee: String,
    Längd: String,
    bruttoScore: Number,
    nettoScore: Number,
    poang: Number,
    vader: String,
    vindstyrka: String,
    temperatur: Number,
    noteringar: String,
    banansSkick: Number,
    sammanfattningBetyg: Number,
    bilder: [BilderSchema],
    spelare: {
      type: Schema.Types.ObjectId,
      ref: 'Anvandare',
    },
    medspelare: {
      type: Schema.Types.ObjectId,
      ref: 'Anvandare',
    },
  },
  opts
);

module.exports = mongoose.model('Golfdagbok', GolfdagbokSchema);
