module.exports = (app) => {
  const movies = require("../controllers/Movie.controller");

  const router = require("express").Router();

  router.post("/", movies.create);

  router.get("/getAll", movies.findAll);
  // router.get("/getAllTitles", movies.findAllTitles);
  router.get("/getByName/:title", movies.findByTitle);
  router.get("/getAllCurrent", movies.findAllCurrent);
  router.get("/getAllUpcoming", movies.findAllUpcoming);
  router.get("/getAllFeatured", movies.findAllFeatured);

  router.patch("/setFeatured", movies.setFeatured);
  router.patch("/setUpcoming", movies.setUpcoming);
  router.patch("/setCurrent", movies.setCurrent);

  app.use("/api/movies", router);
};
