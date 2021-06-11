module.exports = (app) => {
  const cinemas = require("../controllers/Cinema.controller");
  const router = require("express").Router();

  //Create
  router.post("/createCinema", cinemas.create);
  //Find all
  router.get("/getAllCinemas", cinemas.findAll);
  router.get("/getAllNames", cinemas.findAllNames);
  
  //Delete All
  router.delete("/deleteAll", cinemas.deleteAll);

  app.use("/api/cinemas", router);
};
