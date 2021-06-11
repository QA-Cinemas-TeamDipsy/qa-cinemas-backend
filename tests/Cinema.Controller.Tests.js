const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const server = require("../server");
describe("Testing Cinema Controller", () => {

    describe("Testing CRUD", () => {
        it("It should get all the Cinemas in the database", (done) => {
            chai.request(server)
                .get("/api/cinemas/getAllCinemas")
                .end((err, response) => {
                    expect(err).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response).to.be.a('Object');


                    done();


                })
        })
        it("It should not get the Cinemas in the database", (done) => {
            chai.request(server)
                .get("/api/cinemas/getAllCinema")
                .end((err, response) => {
                    expect(response).to.have.status(404);

                    done();


                })
        })
        it("It should get all the Cinemas names in the database", (done) => {
            chai.request(server)
                .get("/api/cinemas/getAllNames")
                .end((err, response) => {
                    expect(err).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response).to.be.a('Object');



                    done();


                })
        })
        it("It should not get all the Cinemas names in the database", (done) => {
            chai.request(server)
                .get("/api/cinemas/getAllName")
                .end((err, response) => {
                    expect(response).to.have.status(404);


                    done();


                })
        })

        it("It should delete all the Cinemas in the database", (done) => {
            chai.request(server)
                .delete("/api/cinemas/deleteAll")
                .end((err, response) => {
                    expect(err).to.be.null;
                    expect(response).to.have.status(200);



                    done();


                })
        })
        it("It should not get all the Cinemas in the database, empty D", (done) => {
            chai.request(server)
                .get("/api/cinemas/getAllCinemas")
                .end((err, response) => {
                    expect(response).to.have.status(404);


                    done();


                })
        })
        

        it("It should  create a Cinema in the database", (done) => {
            chai.request(server)
                .post("/api/cinemas/createCinema")
                .type("JSON")
                .send({
                    "name": "QA Cinema Salford",
                    "img": "https://media.timeout.com/images/105765826/image.jpg",
                    "location": {
                        "address": {
                            "lineOne": "QA Cinema Salford",
                            "lineTwo": "Lowry Outlet Mall",
                            "lineThree": "The Quays",
                            "city": "Salford",
                            "county": "Lancashire",
                            "postCode": "M50 3AH"

                        },
                        "lat": 53.47115136690482,
                        "lng": -2.2928704642510667
                    },
                    "directions": {
                        "bus": "Bus route 96 runs every 30 minutes from Monday To Saturday and every hour on a Sunday. The bus stops right outside the complex",
                        "train": "The closest train station is Manchester Picaddily. From here take the tram to Harbour city, which is a 250 m walk from the Cinema. Trams run every 10 minutes on weekdays and every 20 on weekends."

                    },

                    "opening_times": {
                        "Mon": {
                            "open": "16:00",
                            "close": "23:45"
                        },
                        "Tue": {
                            "open": "16:00",
                            "close": "23:45"
                        },
                        "Wed": {
                            "open": "16:00",
                            "close": "23:45"
                        },
                        "Thurs": {
                            "open": "16:00",
                            "close": "23:45"
                        },
                        "Fri": {
                            "open": "14:00",
                            "close": "01:00"
                        },
                        "Sat": {
                            "open": "12:00",
                            "close": "02:00"
                        },
                        "Sun": {
                            "open": "11:00",
                            "close": "22:00"
                        }
                    },
                    "type": "deluxe"
                })

                .end((err, response) => {
                    expect(response).to.have.status(201)


                    done();


                })

        })
        it("It should not create a Cinema in the database, FIELD EMPTY", (done) => {
            chai.request(server)
                .post("/api/cinemas/createCinema")
                .type("JSON")
                .send({
                    "name": "",
                    "img": "https://media.timeout.com/images/105765826/image.jpg",
                    "location": {
                        "address": {
                            "lineOne": "QA Cinema Salford",
                            "lineTwo": "Lowry Outlet Mall",
                            "lineThree": "The Quays",
                            "city": "Salford",
                            "county": "Lancashire",
                            "postCode": "M50 3AH"

                        },
                        "lat": 53.47115136690482,
                        "lng": -2.2928704642510667
                    },
                    "directions": {
                        "bus": "Bus route 96 runs every 30 minutes from Monday To Saturday and every hour on a Sunday. The bus stops right outside the complex",
                        "train": "The closest train station is Manchester Picaddily. From here take the tram to Harbour city, which is a 250 m walk from the Cinema. Trams run every 10 minutes on weekdays and every 20 on weekends."

                    },

                    "opening_times": {
                        "Mon": {
                            "open": "16:00",
                            "close": "23:45"
                        },
                        "Tue": {
                            "open": "16:00",
                            "close": "23:45"
                        },
                        "Wed": {
                            "open": "16:00",
                            "close": "23:45"
                        },
                        "Thurs": {
                            "open": "16:00",
                            "close": "23:45"
                        },
                        "Fri": {
                            "open": "14:00",
                            "close": "01:00"
                        },
                        "Sat": {
                            "open": "12:00",
                            "close": "02:00"
                        },
                        "Sun": {
                            "open": "11:00",
                            "close": "22:00"
                        }
                    },
                    "type": "deluxe"
                })

                .end((err, response) => {
                    expect(response).to.have.status(400)


                    done();


                })

        })
    

      

    })
})