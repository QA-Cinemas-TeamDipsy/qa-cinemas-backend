module.exports = mongoose => {
    const ViewingTimes = mongoose.model(
        "Viewing Times",
        mongoose.Schema(
            {
                movie_id: mongoose.SchemaTypes.ObjectId,
                cinema_id: mongoose.SchemaTypes.ObjectId,
                viewing_times: {
                    monday: [
                        {
                            hours: {
                                type: Number,
                                min: 0,
                                max: 23
                            },
                            minutes: {
                                type: Number,
                                min: 0,
                                max: 59
                            }
                        }
                    ],
                    tuesday: [
                        {
                            hours: {
                                type: Number,
                                min: 0,
                                max: 23
                            },
                            minutes: {
                                type: Number,                            
                                min: 0,
                                max: 59
                            }
                        }
                    ],
                    wednesday: [
                        {
                            hours: {
                                type: Number,
                                min: 0,
                                max: 23
                            },
                            minutes: {
                                type: Number,  
                                min: 0,
                                max: 59
                            }
                        }
                    ],
                    thursday: [
                        {
                            hours: {
                                type: Number,  
                                min: 0,
                                max: 23
                            },
                            minutes: {
                                type: Number,     
                                min: 0,
                                max: 59
                            }
                        }
                    ],
                    friday: [
                        {
                            hours: {
                                type: Number,
                                min: 0,
                                max: 23
                            },
                            minutes: {
                                type: Number,
                                min: 0,
                                max: 59
                            }
                        }
                    ],
                    saturday: [
                        {
                            hours: {
                                type: Number,
                                min: 0,
                                max: 23
                            },
                            minutes: {
                                type: Number,
                                min: 0,
                                max: 59
                            }
                        }
                    ],
                    sunday: [
                        {
                            hours: {
                                type: Number,
                                min: 0,
                                max: 23
                            },
                            minutes: {
                                type: Number,
                                min: 0,
                                max: 59
                            }
                        }
                    ]
                }

            }
        )
    );

    return ViewingTimes;
}