import * as request from "supertest";
import * as mongoUnit from "mongo-unit";
import { describe } from "mocha";
import { expect } from "chai";
import { App } from "../app";

let app;
const dbData = require('./resources/airportsControllerTestData.json');
const airports = dbData['airports'];
const airport = {
    name: 'name',
    city: 'city',
    country: 'country',
    planeCapacity: 10
};


before(() =>
    mongoUnit
        .start()
        .then(url => {
            app = new App(url).getExpressApp();
        }));

beforeEach(() => mongoUnit.load(dbData));

afterEach(() => mongoUnit.drop());

after(() => mongoUnit.stop());

describe('/airports', () => {

    describe('GET /airports', () => {
        it('should return a list of 3 airports and the status 200', () => {
            return request(app)
                .get('/api/v1/airports')
                .expect(200)
                .then(response => {
                    expect(response.body).to.eql(airports);
                });
        });
    });


    describe('GET /airports/:id', () => {
        it('should return a status of 404 when getting by invalid id', () => {
            const userId = 'id';

            return request(app)
                .get('/api/v1/airports' + '/' + userId)
                .expect(404);
        });

        it('should return the proper entity and the status 200 when getting by id', () => {
            return request(app)
                .post('/api/v1/airports')
                .send(airport)
                .then(async response => {
                    const entityId = response.body._id;
                    const savedEntity = response.body;

                    await request(app)
                        .get('/api/v1/airports' + '/' + entityId)
                        .expect(200)
                        .then(response => {
                            expect(response.body._id).to.exist;
                            expect(response.body).to.contain(savedEntity);
                        });
                });
        });
    });

    describe('POST /airports', () => {
        it('should return the created airport with a status of 201 when creation is successful', () => {
            return request(app)
                .post('/api/v1/airports')
                .send(airport)
                .expect(201)
                .then(response => {
                    expect(response.body._id).to.exist;
                    expect(response.body).to.contain(airport);
                });
        });

        it('should return 400 bad request when submitting data with missing fields', () => {
            const badAirport = { ...airport };
            badAirport.name = null;

            return request(app)
                .post('/api/v1/airports')
                .send(badAirport)
                .expect(400);
        });
    });

    describe('PUT /airports/:id', () => {
        it('should return the updated airport with a status of 200 when update is successful', () => {
            return request(app)
                .post('/api/v1/airports')
                .send(airport)
                .expect(201)
                .then(async response => {
                    const entityId = response.body._id;
                    const updatedAirport = { ...airport };
                    updatedAirport.name = 'updated airport';

                    await request(app)
                        .put('/api/v1/airports' + '/' + entityId)
                        .send(updatedAirport)
                        .expect(200)
                        .then(response => {
                            expect(response.body).to.contain(updatedAirport);
                        });
                });
        });
    });

    describe('DELETE /airports/:id', () => {
        it('should return 204 no content on successfull airport deletion', () => {
            return request(app)
                .post('/api/v1/airports')
                .send(airport)
                .expect(201)
                .then(async response => {
                    const entityId = response.body._id;

                    await request(app)
                        .delete('/api/v1/airports' + '/' + entityId)
                        .expect(204)
                        .then(response => {
                            expect(response.body).to.be.empty;
                        });
                });
        });
    });
});