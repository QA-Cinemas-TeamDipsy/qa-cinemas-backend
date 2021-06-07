const db = require("../models");
const Movie = db.movies;

const axios = require(`axios`);

exports.findAll = (req, res) => {

    const name = req.query.name;
    let condition = name ? {
        name: {
            $regex: new RegExp(name),
            $options: "i"
        }
    } : {};

    Movie.find(condition)
        .then(data => {
            if(data.length ===0 ){
                res.status(404).send("Movie database is curretly empty");

            }else{
            res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error has occured" });
        });

};

exports.findOne = (req, res) => {
    const movieName = req.params.title;

    Movie.findOne({
        title: {
            $regex: new RegExp(movieName),
            $options: "i"
        }

    }).
        then(result => {
            if (!result) {
                
                res.status(404).send(`Error ${movieName} not found`);
            } else {
                res.send(result);
            }


        }).catch(err => {
            res.status(500).send({
                message: err.message || `An error has occurred while finding ${movieName} `
            })
        });
};

exports.create = (req, res) => {
    const API_URL = "http://www.omdbapi.com/?apikey=1fac6c28&i=";

    axios.get(`${API_URL}${req.query.imdbID}`).then(axiosResp => {
        let movieFromAPI = axiosResp.data;
        
        const movie = new Movie({
            title: movieFromAPI.Title,
            year: parseInt(movieFromAPI.Year),
            rating: movieFromAPI.Rated,
            released: movieFromAPI.Released,
            runtime: movieFromAPI.Runtime,
            genres: movieFromAPI.Genre.split(',').map(str => str.trim()),
            directors: movieFromAPI.Director.split(',').map(str => str.trim()),
            writers: movieFromAPI.Writer.split(',').map(str => str.trim()),
            actors: movieFromAPI.Actors.split(',').map(str => str.trim()),
            plot: movieFromAPI.Plot,
            languages: movieFromAPI.Language.split(',').map(str => str.trim()),
            country: movieFromAPI.Country,
            awards: movieFromAPI.Awards,
            poster: movieFromAPI.Poster,
            ratings: movieFromAPI.Ratings,
            metascore: parseInt(movieFromAPI.Metascore),
            imdbRating: movieFromAPI.ImdbRating,
            imdbID: movieFromAPI.ImdbID,
            boxOffice: movieFromAPI.BoxOffice,
            production: movieFromAPI.Production.split(',').map(str => str.trim()),
            website: movieFromAPI.Website,
        })

        movie
            .save(movie)
            .then(data => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occured whilst saving the user. Please try again later."
                });
            });

    }).catch(axiosErr => {
        console.error(axiosErr);
        res.status(500).send({
            message: axiosErr.message || "An error occurred whilst accesing OMDB. Please try again later."
        })
    });



}