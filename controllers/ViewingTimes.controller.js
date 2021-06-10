const db = require("../models");
const ViewingTimes = db.viewingTimes;

exports.create = (req, res) => {
  if (!req.body.movie_id) {
    res.status(400).send("Field cannot be empty");
    return;
  }
  //Hard coded

  const viewingTimes = new ViewingTimes({
    movie_id: req.body.movie_id,
    cinema_id: req.body.cinema_id,
    viewing_times: req.body.viewing_times,
    type: req.body.type,
  });

  viewingTimes
    .save(viewingTimes)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred whe creating viewing times",
      });
    });
};

exports.findViewingTimes = (req, res) => {
  ViewingTimes.findOne(
    {
      cinema_id: req.query.cinema_id,
      movie_id: req.query.movie_id,
    },
    (err, viewingTimes) => {
      if (err) {
        res.status(400).send({
          message:
            err.message ||
            "An error has occurred while finding viewing times for this instance.",
        });
      } else if (!viewingTimes) {
        res.status(404).send({
          message:
            "Error: No viewing times found for this movie in specified cinema.",
        });
      }

      res.status(201).send(viewingTimes);
    }
  );
};

exports.findAll = (req, res) => {
  const movie_id = req.query.movie_id;
  const cinema_id = req.query.cinema_id;
  let condition = movie_id
    ? {
        movie_id: {
          $regex: new RegExp(movie_id),
          $options: "i",
        },
      }
    : cinema_id
    ? {
        cinema_id: {
          $regex: new RegExp(cinema_id),
          $options: "i",
        },
      }
    : {};

  ViewingTimes.find(condition)
    .then((data) => {
      if (!data) {
        res
          .send(404)
          .send(
            `Error, no viewing times for movie ID: ${movie_id} at cinema ID: ${cinema_id}`
          );
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error has occured while finding all Cinema times",
      });
    });
};

// exports.findOne = (req, res) => {
//   const id = req.params.movie_id;

//   CinemaTimes.findById(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({
//           message: "No viewing times matching movie ID: " + id,
//         });
//       else res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error retrieving Cinema times with id: " + id,
//       });
//     });
// };
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "You must enter some data to update",
//     });
//   }

//   const id = req.params.movie_id;

//   CinemaTimes.findByIdAndUpdate(id, req.body, {
//     useFindAndModify: false,
//   })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cinema times not found with id: ${id}`,
//         });
//       } else
//         res.send({
//           message: "Cinema times was updated successfully.",
//         });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Cinema times with id=" + id,
//       });
//     });
// };

// exports.delete = (req, res) => {
//   const id = req.params.id;

//   CinemaTimes.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Cinema times with id=${id}.`,
//         });
//       } else {
//         res.send({
//           message: "Cinema times was deleted successfully!",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Cinema with id=" + id,
//       });
//     });
// };

// exports.deleteAll = (req, res) => {
//   Cinema.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Cinemas were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Cinemas.",
//       });
//     });
// };
