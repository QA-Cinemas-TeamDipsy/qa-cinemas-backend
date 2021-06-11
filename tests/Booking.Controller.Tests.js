const {
    expect
} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const server = require("../server");

describe("Testing Booking Controller", () => {

    describe("Testing create", () => {
        it("It should create a booking in the database", (done) => {

            chai.request(server)
                .post("/api/booking/")
                .type("JSON")
                .send({
                    "amount": "2",
                    "email": "abcdef@gmail.com",
                    "card_number": "123456789",
                    "card_exp_month": "12",
                    "card_exp_year": 2023,
                    "card_cvc": 123,
                    "card_name": "Bobbert",
                    "country": "UK",
                    "postal_code": "cr6h3s",
                    "movie_title": "Shrek 2",
                    "movie_day": "Monday",
                    "movie_time": "16:30",
                    "adult_tickets": 1,
                    "child_tickets": 1,
                    "senior_tickets": 1


                })
                .end((err, response) => {
                    expect(err).to.be.null;
                    expect(response).to.have.status(201);
                    expect(response).to.be.a('Object');
                    done();
                })

        })
        it("It should not create a booking in the database", (done) => {

            chai.request(server)
                .post("/api/booking/")
                .type("JSON")
                .send({
                    "amount": "2",
                    "email": "abcdef@gmail.com",
                    "card_number": "123456789",
                    "card_exp_month": "12",
                    "card_exp_year": 2023,
                    "card_cvc": 123,
                    "card_name": "Bobbert",
                    "country": "UK",
                    "postal_code": "cr6h3s",
                    "movie_title": "Shrek 2",
                    "movie_day": "",
                    "movie_time": "16:30",
                    "adult_tickets": 1,
                    "child_tickets": 1,
                    "senior_tickets": 1


                })
                .end((err, response) => {
                    
                    expect(response).to.have.status(500);
                
                    done();
                })

        })
        it("It should not create a booking in the database,empty content", (done) => {

            chai.request(server)
                .post("/api/booking/")
                .type("JSON")
                .send({
                    "amount": "",
                    "email": "abcdef@gmail.com",
                    "card_number": "123456789",
                    "card_exp_month": "12",
                    "card_exp_year": 2023,
                    "card_cvc": 123,
                    "card_name": "Bobbert",
                    "country": "UK",
                    "postal_code": "cr6h3s",
                    "movie_title": "Shrek 2",
                    "movie_day": "Mond",
                    "movie_time": "16:30",
                    "adult_tickets": 1,
                    "child_tickets": 1,
                    "senior_tickets": 1


                })
                .end((err, response) => {
                    
                    expect(response).to.have.status(400);
                
                    done();
                })

        })
    })
})