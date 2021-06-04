module.exports = app => {
    const users = require("../controllers/User.controller.js");

    const router = require("express").Router();

    router.post('/', users.create);


    app.use('/api/users', router);
}