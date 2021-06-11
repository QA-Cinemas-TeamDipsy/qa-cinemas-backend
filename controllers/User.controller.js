const db = require("../models");
const User = db.users;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

// Create and Save a new user
exports.create = (req, res) => {

    if (!req.body.username) {
        res.status(400).send({ message: "Content is incomplete! Please try again" });
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
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured whilst saving the user. Please try again later."
            })
        });
};

exports.validate = (req, res) => {
    const loginName = req.body.loginName;
    const password = req.body.password;

    User.findOne({
        "$or": [{
            username: loginName
        }, {
            emailAddress: loginName
        }]
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: "Error occurred whilst finding user. Please try again later."
            })
        } else if (!user) {
            res.status(404).send({
                message: "No user found with specified email address or username."
            })
        } else {
            bcrypt.compare(password, user.password).then(v => {
                if (v) {
                    let validatedUser = JSON.parse(JSON.stringify(user));
                    validatedUser.token = jwt.sign(user.username, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
                    res.status(200).send(validatedUser);
                } else {
                    res.status(400).send({ message: "Error: Password is incorrect." });
                }


            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred whilst validating user. Please try again later."
                })
            })
        }
    })
}

