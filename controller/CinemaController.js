const db = require("../models");
const Cinema = db.cinemas;

exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send("Field cannot be empty");
        return;
    }
    //Hard coded

    const cinema = new Cinema({
        name: req.body.name,
        location: {
            address: req.body.location.address,

            lat: req.body.location.lat,
            lng: req.body.location.lng

        },
        opening_times: {
            
                Mon: {
                    open: req.body.opening_times.Mon.start,
                    close: req.body.opening_times.Mon.end
                },
                Tue: {
                    open: req.body.opening_times.Tue.start,
                    close: req.body.opening_times.Tue.end
                },
                Wed: {
                    open: req.body.opening_times.Wed.start,
                    close: req.body.opening_times.Wed.end
                },
                Thurs: {
                    open: req.body.opening_times.Thurs.start,
                    close: req.body.opening_times.Thurs.end
                },
                Fri: {
                    open: req.body.opening_times.Fri.start,
                    close: req.body.opening_times.Fri.end
                },
                Sat: {
                    open: req.body.opening_times.Sat.start,
                    close: req.body.opening_times.Sat.end
                },
                Sun: {
                    open: req.body.opening_times.Sun.start,
                    close: req.body.opening_times.Sun.end
                }
            
        },
        type: req.body.type
    });

    cinema.save(cinema)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred whe creating Cinema"
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
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error has occured while finding all Cinemas"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Cinema.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "No Cinemas matching id: " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Cinema with id: " + id
            });
        });
};
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "You must enter some data to update"
        });
    }

    const id = req.params.id;

    Cinema.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cinema not found with id: ${id}`
                });
            } else res.send({
                message: "Cinema was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Cinema with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Cinema.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Cinema with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Cinema was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Cinema with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Cinema.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Cinemas were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Cinemas."
            });
        });
};