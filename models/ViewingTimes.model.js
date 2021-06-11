module.exports = (mongoose) => {
  const ViewingTimes = mongoose.model(
    "Viewing Times",
    mongoose.Schema({
      movie_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "movie",
      },
      cinema_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "cinema",
      },
      viewing_times: {
        monday: [
          {
            hours: {
              type: Number,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              min: 0,
              max: 59,
            },
          },
        ],
        tuesday: [
          {
            hours: {
              type: Number,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              min: 0,
              max: 59,
            },
          },
        ],
        wednesday: [
          {
            hours: {
              type: Number,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              min: 0,
              max: 59,
            },
          },
        ],
        thursday: [
          {
            hours: {
              type: Number,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              min: 0,
              max: 59,
            },
          },
        ],
        friday: [
          {
            hours: {
              type: Number,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              min: 0,
              max: 59,
            },
          },
        ],
        saturday: [
          {
            hours: {
              type: Number,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              min: 0,
              max: 59,
            },
          },
        ],
        sunday: [
          {
            hours: {
              type: Number,
              min: 0,
              max: 23,
            },
            minutes: {
              type: Number,
              min: 0,
              max: 59,
            },
          },
        ],
      },
    })
  );

  return ViewingTimes;
};
