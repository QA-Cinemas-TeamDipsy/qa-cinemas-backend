module.exports = app => {
    const viewingtimes =  require("../controllers/Booking.controller");
    const router = require("express").Router();
    
    router.post('/', viewingtimes.create);

    app.use('/api/viewingtimes', router);
}