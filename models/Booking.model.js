module.exports = (mongoose) => {
  const Booking = mongoose.model(
    "booking",
    mongoose.Schema(
      {
        amount: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        card_number: {
          type: String,
          required: true,
        },
        card_exp_month: {
          type: String,
          required: true,
        },
        card_exp_year: {
          type: Number,
          required: true,
        },
        card_cvc: {
          type: Number,
          required: true,
        },
        card_name: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postal_code: {
          type: String,
          required: true,
        },
        movie_title: {
          type: String,
          required: true,
        },
        movie_day: {
          type: String,
          required: true,
        },
        movie_time: {
          type: String,
          required: true,
        },
        adult_tickets: {
          type: Number,
          min: 0,
        },
        child_tickets: {
          type: Number,
          min: 0,
        },
        senior_tickets: {
          type: Number,
          min: 0,
        },
      },
      { timestamps: true }
    )
  );

  return Booking;
};
