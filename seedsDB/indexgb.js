const mongoose = require('mongoose');
const golfbanor = require('./golfbanor');
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
  for (let i = 0; i < golfbanor.length; i++) {
    const course = new Golfbana({
      title: golfbanor[i].golfbana ? golfbanor[i].golfbana : '',
      holes: golfbanor[i].hål ? golfbanor[i].hål : [],
      courses: golfbanor[i].banor ? golfbanor[i].banor : [],
      par: golfbanor[i].par ? golfbanor[i].par : [],
      homepageurl: golfbanor[i].hemsida ? golfbanor[i].hemsida : '',
      golfguidenurl: golfbanor[i].golfguiden ? golfbanor[i].golfguiden : '',
      geometry: {
        type: 'Point',
        coordinates: golfbanor[i].long ? [golfbanor[i].long, golfbanor[i].lat] : [],
      },
    });
    await course.save();
    console.log(course);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
