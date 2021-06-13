const mongoose = require('mongoose');
const golfbanor = require('./golfbanor');
const Golfdagbok = require('../models/golfdagbok');
const { datum, tee, langd, vader, bilder, medspelare } = require('./dagbokSeddHelp.js');

mongoose.connect('mongodb://localhost:27017/golfdagboken', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Golfdagbok.deleteMany({});
  for (let i = 0; i < 15; i++) {
    const dagbok = new Golfdagbok({
      datum: datum[i],
      bana: golfbanor[i].golfbana,
      antalHal: 18,
      banansPar: Math.floor(Math.random() * 7) + 67,
      tee: sample(tee),
      langd: langd[i],
      bruttoScore: Math.floor(Math.random() * 15) + 85,
      nettoScore: Math.floor(Math.random() * 15) + 73,
      poang: Math.floor(Math.random() * 18) + 25,
      vader: sample(vader),
      vindstyrka: `${Math.floor(Math.random() * 10)} m/s`,
      temperatur: Math.floor(Math.random() * 18) + 8,
      noteringar:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus, sequi fuga ut error porro magnam quas consequuntur.',
      banansSkick: Math.floor(Math.random() * 5) + 1,
      sammanfattningBetyg: Math.floor(Math.random() * 5) + 1,
      bilder: {
        url: sample(bilder),
        filename: 'bildnamn',
      },
      spelare: 'Magnus Ögren',
      medspelare: sample(medspelare),
    });
    await dagbok.save();
    // console.log(golfbanor);
    // console.log(dagbok);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
