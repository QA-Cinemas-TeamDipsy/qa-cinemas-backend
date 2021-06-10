module.exports = (mongoose) => {
  const uniqueValidator = require("@yastech/mongoose-unique-validator");

  const movieSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      rating: String,
      released: String,
      runtime: String,
      genres: [String],
      directors: [String],
      writers: [String],
      actors: [String],
      plot: String,
      languages: [String],
      country: String,
      awards: String,
      poster: String,
      ratings: [
        {
          source: String,
          value: String,
        },
      ],
      metascore: String,
      imdbRating: String,
      imdbID: {
        type: String,
        required: true,
        unique: true,
      },
      boxOffice: String,
      production: [String],
      website: String,
      status: {
        featured: Boolean,
        upcoming: Boolean,
        current: Boolean,
      },
    },
    { timestamps: true }
  );

  movieSchema.plugin(uniqueValidator);

  const movie = mongoose.model("movie", movieSchema);

  return movie;
};
