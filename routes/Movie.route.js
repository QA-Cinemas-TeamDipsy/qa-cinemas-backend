module.exports = app => {
    const movies = require("../controllers/Movie.controller");

    const router = require("express").Router();

    router.post('/', movies.create);

    router.get('/getAllMovies', movies.findAll);

    router.get('/getMovieByName/:title', movies.findOne);


    app.use('/api/movies', router);
}