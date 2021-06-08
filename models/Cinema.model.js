module.exports = mongoose => {

    const uniqueValidator = require('@yastech/mongoose-unique-validator');

    const cinemaSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                unique: true
            },
            location: {
                address: {
                    lineOne: String,
                    lineTwo: String,
                    lineThree: String,
                    city: String,
                    county: String,
                    postCode: String
                },
                lat: Number,
                lng: Number
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
            }
        },
        { timestamps: true }
    );

    cinemaSchema.plugin(uniqueValidator);

    const cinema = mongoose.model("cinema", cinemaSchema);
    return cinema;
};