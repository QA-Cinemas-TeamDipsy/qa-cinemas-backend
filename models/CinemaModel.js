module.exports = mongoose => {
    const CinemaModel = mongoose.model(
        "cinema",
        mongoose.Schema({
                name: String,
                location: {
                    address: String,
                    lat: String,
                    lng: String
                },

                opening_times: {
                    Mon: {
                        open: String,
                        close: String
                    },
                    Tue: {
                        open: String,
                        close: String
                    },
                    Wed: {
                        open: String,
                        close: String
                    },
                    Thurs: {
                        open: String,
                        close: String
                    },
                    Fri: {
                        open: String,
                        close: String
                    },
                    Sat: {
                        open: String,
                        close: String
                    },
                    Sun: {
                        open: String,
                        close: String
                    }
                },
                type: String
            },

        )
    );
    return CinemaModel;
};