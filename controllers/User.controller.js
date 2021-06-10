const db = require("../models");
const User = db.users;

// Create and Save a new user
exports.create = (req, res) => {

    if (!req.body.username) {
        res.status(400).send({ message: "Content is empty! Please try again" });
        return;
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        postCode: req.body.postCode,

    });


    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured whilst saving the user. Please try again later."
            })
        });



};