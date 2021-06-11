const db = require("../models");
const Cinema = db.cinemas;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send("Field cannot be empty");
    return;
  }

  const cinema = new Cinema({
    name: req.body.name,
    location: req.body.location,
    directions: req.body.directions,
    opening_times: req.body.opening_times,
    img: req.body.img,
    type: req.body.type,
  });

  cinema
    .save(cinema)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred when creating Cinema",
      });
    });
};
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? {
    name: {
      $regex: new RegExp(name),
      $options: "i"
    }
  } : {};

  Cinema.find(condition)
    .then(data => {
      if (data.length === 0) {
        res.status(404).send("Cinema database is currently empty");
      } else {
        res.send(data);
      }

    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error has occured while finding all Cinemas"
      });
    });
};


exports.findAllNames = (req, res) => {
  Cinema.find({}, "name", (err, movies) => {
    if (err || movies.length === 0) {
      res.status(404).send({
        message: "Error: No cinemas found",
      });
    }

    res.status(200).send(movies);
  });
};







exports.deleteAll = (req, res) => {
  Cinema.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Cinemas were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Cinemas.",
      });
    });
};