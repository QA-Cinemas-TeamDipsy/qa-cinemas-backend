const ROUTER = require('express').Router();
const CINEMA = require('../models/CinemaModel');

ROUTER.post('/create', async (req, res) => {
    // const CINE = new CINEMA(req.body);
    const CroyCINE = new CINEMA({
        name: "QA Cinema Croydon",
        location: [{
            address: "Valley Retail Park, Daniell Way, Croydon CR0 4YJ",
            coordinates: [{
                lat:51.379911099043326,
                lng:-0.12694919816431863
            }]
        }],
        opening_times: [{
            Mon: [{
                start: "16:00",
                end: "23:45"
            }],
            Tue: [{
                start: "16:00",
                end: "23:45"
            }],
            Wed: [{
                start: "16:00",
                end: "23:45"
            }],
            Thurs: [{
                start: "16:00",
                end: "23:45"
            }],
            Fri: [{
                start: "14:00",
                end: "01:00"
            }],
            Sat: [{
                start: "12:00",
                end: "2:00"
            }],
            Sun: [{
                start: "11:00",
                end: "22:00"
            }]
        }],
        type: "deluxe"

    })

    try {
        const CREATED = await CroyCINE.save();
        res.status(201).send(CREATED);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send(err.message);
    }

});


ROUTER.get("/getAll", async (req, res) => {
    try {
        const CINEMAS = await CINEMA.find();
        if (CINEMAS.length) {
            res.send(CINEMAS);
        } else {
            res.status(404).send("Error: No Cinemas in database");
        };
    } catch (err) {

        res.status(500).send(err.message);
    }
})

ROUTER.get("/getById/:id", async (req, res) => {
    try {
        const FIND = await CINEMA.findById(req.params.id);
        if (FIND) {
            res.send(FIND);
        } else {
            res.status(404).send("Error: No Cinema with that ID");
        };

    } catch (err) {

        res.status(500).send(err.message);

    };
});

ROUTER.put("/update/:id", async (req, res) => {

    try {

        const UPDATE = await CINEMA.findByIdAndUpdate({
                _id: req.params.id
            },
            req.body, {
                new: true
            }
        );
        if (UPDATE) {
            res.status(204).send(UPDATE);
        } else {
            res.status(404).send("Error: Cinema not found");
        };
    } catch (err) {
        res.status(500).send(err.message);
    }

});

ROUTER.delete("/delete/:id", async (req, res) => {
    try {
        const DELETE = await CINEMA.findByIdAndDelete(req.params.id);
        if (DELETE) {
            res.status(204).send(DELETE);
        } else {
            res.status(404).send("Error: Cinema not found");
        }


    } catch (err) {
        res.status(500).send(err.message);

    }
});

module.exports = ROUTER;