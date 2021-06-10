module.exports = (app) => {
  const booking = require("../controllers/Booking.controller");
  const router = require("express").Router();

  //Create
  router.post("/", booking.create);
  // //Find all
  // router.get("/getAllBooking", booking.findAll);
  // //Findy by ID
  // router.get("/getBookingById/:id" ,booking.findOne);
  // //Update by ID
  // router.put("/updateBooking/:id", booking.update);
  // //Delete by ID
  // router.delete("/deleteBooking/:id", booking.delete);
  // //Delete All
  // router.delete("/deleteAllBooking", booking.deleteAll);

  app.use("/api/booking", router);
};
