const db = require("../models");
const Booking = db.bookings;

exports.create = (req, res) => {
  if (!req.body.amount) {
    res.status(400).send({ message: "Content is empty! Please try again" });
    return;
  }

  const booking = new Booking({
    amount: req.body.amount,
    email: req.body.email,
    card_number: req.body.card_number,
    card_exp_month: req.body.card_exp_month,
    card_exp_year: req.body.card_exp_year,
    card_cvc: req.body.card_cvc,
    card_name: req.body.card_name,
    country: req.body.country,
    postal_code: req.body.postal_code,
    adult_tickets: req.body.adult_tickets,
    child_tickets: req.body.child_tickets,
    senior_tickets: req.body.senior_tickets,
    movie_day: req.body.movie_day,
    movie_time: req.body.movie_time,
    movie_title: req.body.movie_title,
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
