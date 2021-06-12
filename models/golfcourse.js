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

const GolfcourseSchema = new Schema(
  {
    title: String,
    // images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        reqired: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    holes: {
      type: [Number],
      reqired: false,
    },
    courses: {
      type: [String],
      reqired: false,
    },
    par: {
      type: [Number],
      reqired: false,
    },
    homepageurl: {
      type: String,
      required: true,
    },
    golfguidenurl: {
      type: String,
      required: true,
    },
  },
  opts
);

// GolfcourseSchema.virtual('properties.popUpMarkup').get(function () {
//   return `
//   <strong><a href="/golfcourses/${this._id}">${this.title}</a></strong>
//   <p>${this.description.substring(0, 20)}...</p>`;
// });

// GolfcourseSchema.post('findOneAndDelete', async function (doc) {
//   if (doc) {
//     await Review.deleteMany({
//       _id: {
//         $in: doc.reviews,
//       },
//     });
//   }
// });

module.exports = mongoose.model('Golfcourse', GolfcourseSchema);
