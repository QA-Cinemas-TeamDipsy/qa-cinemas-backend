module.exports = app => {
    const cinemas =  require("../controller/CinemaController");
    const router = require("express").Router();
    
    //Create
    router.post("/createCinema", cinemas.create);
    //Find all
    router.get("/getAllCinemas", cinemas.findAll);
    //Findy by ID
    router.get("/getCinemaById/:id" ,cinemas.findOne);
    //Update by ID
    router.put("/updateCinema/:id", cinemas.update);
    //Delete by ID
    router.delete("/deleteCinema/:id", cinemas.delete);
    //Delete All
    router.delete("/deleteAllCinemas", cinemas.deleteAll);

    app.use('/api/cinemas', router);
}