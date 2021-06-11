module.exports = app => {
    const users = require("../controllers/User.controller.js");

    const router = require("express").Router();

    router.post("/", users.create);
    router.post("/validate", users.validate);


    app.use("/api/users", router);
}