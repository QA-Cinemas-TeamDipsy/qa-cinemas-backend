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
    opening_times: req.body.opening_times,
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cinema.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "No Cinemas matching id: " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Cinema with id: " + id,
      });
    });
};

// exports.find
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "You must enter some data to update",
    });
  }

  const id = req.params.id;

  Cinema.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cinema not found with id: ${id}`,
        });
      } else
        res.send({
          message: "Cinema was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Cinema with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cinema.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cinema with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Cinema was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Cinema with id=" + id,
      });
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
        message:
          err.message || "Some error occurred while removing all Cinemas.",
      });
    });
};
