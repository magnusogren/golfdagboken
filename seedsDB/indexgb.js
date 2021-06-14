const mongoose = require('mongoose');
const { golfbanor } = require('./golfbanor.js');
const Golfbana = require('../models/golfbana');

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

const seedDB = async () => {
  await Golfbana.deleteMany({});
  console.log(golfbanor.length);
  for (let i = 0; i < golfbanor.length; i++) {
    const golfbana = new Golfbana({
      name: golfbanor[i].name ? golfbanor[i].name : '',
      hal: golfbanor[i].hal ? golfbanor[i].hal : '',
      vagbeskrivning: golfbanor[i].vagbeskrivning ? golfbanor[i].vagbeskrivning : '',
      info: golfbanor[i].info ? golfbanor[i].info : '',
      par: golfbanor[i].par ? golfbanor[i].par : '',
      hemsida_url: golfbanor[i].hemsida_url ? golfbanor[i].hemsida_url : '',
      epost: golfbanor[i].epost ? golfbanor[i].epost : '',
      golfguidenurl: golfbanor[i].golfguidenurl ? golfbanor[i].golfguidenurl : '',
      geometry: {
        type: 'Point',
        coordinates: golfbanor[i].long ? [golfbanor[i].long, golfbanor[i].lat] : [],
      },
    });
    await golfbana.save();
    // console.log(golfbana);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
