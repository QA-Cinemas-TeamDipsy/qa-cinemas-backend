const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require("../server");
const User = require("../models").users;

chai.expect();
chai.use(chaiHttp);

describe("CRUD functionality of User schema", () => {

    const createUserRoute = "/api/users/";
    const validateUserRoute = "/api/users/validate";

    describe("Tests for creating user", () => {

        it("Successfully creates user", (done) => {

            after((done) => {
                User.findOneAndDelete({ username: "testUsername" }, (err, user) => {
                    if (err) {
                        done(err);
                    };

                    if (!user) {
                        done(new Error("User was not found"));
                    };

                    done();
                })
            });

            const registerDetails = {
                username: "testUsername",
                password: "qwe321",
                emailAddress: "example@local.com",
                firstName: "Test",
                lastName: "Person",
                postCode: "N1 1DT"
            };

            chai.request(server).post(createUserRoute).send(registerDetails).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.headers['content-type']).to.have.string('application/json');
                expect(res.body.password).to.not.equal(registerDetails.password);
                done();
            });
        });

        it("Fails if required keys aren't provided", (done) => {

            const testObj = {
                lastName: "McTest",
                postCode: "RD1 3NT"
            };
    
            chai.request(server).post(createUserRoute).send(testObj).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body.message).to.not.be.empty;
                done();
            })
        });

        it("Fails to save user to database", (done) => {

            const testObj = {
                username: "testUsername",
                password: "qwe321"
            }

            chai.request(server).post(createUserRoute).send(testObj).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                expect(res.body.message).to.not.be.empty;
                done();
            });
        });
    });

    describe("Tests for validation of user", () => {
        it("Successfully validates user", (done) => {

            const registerDetails = {
                username: "anotherUser",
                password: "123abc",
                emailAddress: "example@hidden.org",
                firstName: "Another",
                lastName: "Test",
                postCode: "NG9 8ZT"
            };

            let passwordHash = null;

            before((done) => {
                chai.request(server).post(createUserRoute).send(registerDetails).end((err, res) => {
                    if (err) {
                        done(err);
                    }

                    this.passwordHash = res.body.password;
                    done();
                });
            });

            console.log(`PasswordHash is ${passwordHash}`);

            let {emailAddress} = registerDetails;

            let newObj = {
                loginName: emailAddress,
                password: passwordHash
            }

            chai.request(server).post(validateUserRoute).send(newObj).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.password).to.equal(passwordHash);
                expect(res.body).to.have.property("token");
                done();
            });

            // requester.close();

        });

        it("Fails to find user", (done) => {
            const testUser = {
                loginName: "testUser",
                password: "test123"
            }

            chai.request(server).post(validateUserRoute).send(testUser).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body.message).to.not.be.empty;
                done();
            });
        });

        it("Fails to access database to find user", (done) => {
            const testUser = {
                loginName: "testUser2",
                password: "test2123"
            };

            chai.request(server).post(validateUserRoute).send(undefined).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                expect(res.body.message).to.not.be.empty;
                done();
            });
        });
        it("Unsuccessfully validates user", (done) => {
            const testUser = {
                loginName: "testUser3",
                password: "test3123"
            };
            chai.request(server).post(validateUserRoute).send(testUser).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                expect(res.body.message).to.not.be.empty;
                done();
            });
        });
        it("Fails to compare password hashes for user", (done) => {

            const registerDetails = {
                username: "testUser4",
                password: "test4123",
                emailAddress: "example@madness.org",
                firstName: "Fourth",
                lastName: "User",
                postCode: "MN9 4RZ"
            };

            before((done) => {
                chai.request(server).post(createUserRoute).send(registerDetails).end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    passwordHash = res.body.password;
                    done();
                });
            });

            const testUser = {
                loginName: "testUser4",
                password: "test40123"
            };
            chai.request(server).post(validateUserRoute).send(testUser).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body.message).to.not.be.empty;
                done();
            });
        });
    })
});