module.exports = (app) => {
  const viewingTimes = require("../controllers/ViewingTimes.controller");
  const router = require("express").Router();

  router.post("/", viewingTimes.create);

  app.use("/api/viewingTimes", router);
};
