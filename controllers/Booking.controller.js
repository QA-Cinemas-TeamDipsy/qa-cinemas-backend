const db = require("../models");
const Booking = db.bookings;

exports.create = (req, res) => {
  if (!req.body.user_id) {
    res.status(400).send({ message: "Content is empty! Please try again" });
    return;
  }

  const booking = new Booking({
    user_id: req.body.user_id,
    movie_id: req.body.movie_id,
    adult_tickets: req.body.adult_tickets,
    child_tickets: req.body.child_tickets,
    senior_tickets: req.body.senior_tickets,
    payment_id: req.body.payment_id,
  });

  booking
    .save(booking)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred during creation of booking!",
      });
    });
};
