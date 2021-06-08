const db = require("../models");
const CinemaTimes = db.viewingtimes;

exports.create = (req, res) => {
  if (!req.body.movie_id) {
    res.status(400).send("Field cannot be empty");
    return;
  }
  //Hard coded

  const cinematimes = new CinemaTimes({
    movie_id: req.body.movie_id,
    cinema_id: req.body.cinema_id,
    viewing_times: {
      monday: {
        times: req.body.opening_times.Mon,
      },
      tuesday: {
        times: req.body.opening_times.Tue,
      },
      wednesday: {
        times: req.body.opening_times.Wed,
      },
      thursday: {
        open: req.body.opening_times.Thurs,
      },
      friday: {
        open: req.body.opening_times.Fri,
      },
      saturday: {
        open: req.body.opening_times.Sat,
      },
      sunday: {
        open: req.body.opening_times.Sun,
      },
    },
    type: req.body.type,
  });

  cinematimes
    .save(cinematimes)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred whe creating Cinema times",
      });
    });
};

exports.findAll = (req, res) => {
  const movie_id = req.query.movie_id;
  let condition = movie_id
    ? {
        movie_id: {
          $regex: new RegExp(movie_id),
          $options: "i",
        },
      }
    : {};

  CinemaTimes.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error has occured while finding all Cinema times",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  CinemaTimes.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "No Cinema times matching id: " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Cinema times with id: " + id,
      });
    });
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "You must enter some data to update",
    });
  }

  const id = req.params.id;

  CinemaTimes.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cinema times not found with id: ${id}`,
        });
      } else
        res.send({
          message: "Cinema times was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Cinema times with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  CinemaTimes.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cinema times with id=${id}.`,
        });
      } else {
        res.send({
          message: "Cinema times was deleted successfully!",
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
