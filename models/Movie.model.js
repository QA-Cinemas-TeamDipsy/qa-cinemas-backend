module.exports = mongoose => {
    const Movie = mongoose.model(
        "movie",
        mongoose.Schema(
            {
                title: {
                    type: String,
                    required: true
                },
                year: {
                    type: Number, 
                    required: true
                },
                rating: String,
                released: String,
                runtime: String,
                genres: [String],
                directors: [String],
                writers: [String],
                actors: [String],
                plot: String,
                languages: [String],
                country: String,
                awards: String,
                poster: String,
                ratings: [{
                    source: String,
                    value: String
                }],
                metascore: Number,
                imdbRating: Number,
                imdbID: String,
                boxOffice: String,
                production: [String],
                website: String,
            },
            { timestamps: true }
        )
    );

    return Movie;
}