module.exports = (mongoose) => {
  const Booking = mongoose.model(
    "booking",
    mongoose.Schema(
      {
        user_id: {
          type: mongoose.SchemaTypes.ObjectID,
          required: true,
        },
        movie_id: {
          type: mongoose.SchemaTypes.ObjectID,
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
        payment_id: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

  return Booking;
};
