const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const GolfbanaSchema = new Schema(
  {
    name: String,
    // images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    hal: {
      type: String,
      reqired: false,
    },
    // bana1: {
    //   type: [String],
    //   reqired: false,
    // },
    // bana2: {
    //   type: [String],
    //   reqired: false,
    // },
    // bana3: {
    //   type: [String],
    //   reqired: false,
    // },
    // baninfo1: {
    //   type: [String],
    //   reqired: false,
    // },
    // baninfo2: {
    //   type: [String],
    //   reqired: false,
    // },
    // baninfo3: {
    //   type: [String],
    //   reqired: false,
    // },
    // antalhal1: {
    //   type: [String],
    //   reqired: false,
    // },
    // antalhal2: {
    //   type: [String],
    //   reqired: false,
    // },
    // antalhal3: {
    //   type: [String],
    //   reqired: false,
    // },
    vagbeskrivning: {
      type: String,
      reqired: false,
    },
    omklubb: {
      type: String,
      reqired: false,
    },
    epost: {
      type: String,
      reqired: false,
    },
    info: {
      type: String,
      reqired: false,
    },
    par: {
      type: String,
      reqired: false,
    },
    hemsida_url: {
      type: String,
      required: false,
    },
    golfguidenurl: {
      type: String,
      required: false,
    },
    omdomen: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Omdome',
      },
    ],
  },
  opts
);

{
  /* <a href="/golfbanor/${this._id}"></a> */
}

GolfbanaSchema.virtual('properties.kartPopUp').get(function () {
  return `<a href="/golfbanor/${this._id}"><strong>${this.name}</strong></a>
  <p>${this.omklubb.substring(0, 40)}...</p>`;
});

// GolfcourseSchema.post('findOneAndDelete', async function (doc) {
//   if (doc) {
//     await Review.deleteMany({
//       _id: {
//         $in: doc.reviews,
//       },
//     });
//   }
// });

module.exports = mongoose.model('Golfbana', GolfbanaSchema);
