const http = require('http');
const logger = require('morgan');
const express = require('express');
const { router } = require('./routes/pins');
const request = require('request');
const axios = require('axios');
const Pins = require('./models/Pins');
const { isArray } = require('core-js/fn/array');
const requestPromise = require('request-promise-native');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/api', router);
app.set('port', 3000);

const apiUrl = 'http://localhost:3000/api'

describe('Testing Router', () => {
    let server;
    beforeAll(() => {
        server = http.createServer(app);
        server.listen(3000);
    });
    afterAll(() => {
        server.close();
    });

    describe('GET', () => {
        describe('GET all pins', () => {
            it('should get 200 as status code', (done) => {
                const data = [{id: 1}];
                spyOn(Pins, 'find').and.callFake((callBack) => {
                    callBack(false, data);
                });
                request.get(`${apiUrl}`, (error, response, body) => {
                    const bodyResponse = JSON.parse(response.body);
                    expect(response.statusCode).toBe(200);
                    expect(isArray(bodyResponse)).toBeTruthy();
                    expect(bodyResponse).toEqual(data);
                    done();
                });
            });

            it('should get 500 as status code', (done) => {
                spyOn(Pins, 'find').and.callFake((callBack) => {
                    callBack(true, null);
                });
                request.get(`${apiUrl}`, (error, response, body) => {
                    expect(response.statusCode).toBe(500);
                    done();
                });
            });
        });
        describe('GET pin with the id indicated', () => {
            it('should get 200 as status code', (done) => {
                const pin = {id: 22};
                spyOn(Pins, 'findById').and.callFake((id, callBack) => {
                    callBack(false, pin);
                });
                request.get(`${apiUrl}/${pin.id}`, (error, response, body) => {
                    const bodyResponse = JSON.parse(response.body);
                    expect(error).toBeNull();
                    expect(response.statusCode).toBe(200);
                    expect(bodyResponse).toEqual(pin);
                    done();
                })
            });
            it('should get 500 as status code', (done) => {
                const pin = {id: 22};
                spyOn(Pins, 'findById').and.callFake((id, callBack) => {
                    callBack(true, null);
                });
                request.get(`${apiUrl}/${pin.id}`, (error, response, body) => {
                    expect(response.statusCode).toBe(500);
                    done();
                });
            })
        })
    });

    describe('POST', () => {
        const post = {
            title: 'Calcula tu Menú',
            author: 'Calcula tu Menú',
            description: 'Calcula tu Menú rules',
            percentage: 0,
            tags: [],
            assets: [
                {
                    title: 'Calcula tu Menú',
                    description: 'CTM',
                    readed: false,
                    url: 'https://calculatumenu.com'
                },
                {
                    title: 'Calcula tu Menú',
                    description: 'CTM',
                    readed: false,
                    url: 'https://calculatumenu.com/favicon.jpg'
                }
            ]
        };
        it('should get 200 as status code', (done) => {
            spyOn(Pins, 'create').and.callFake((pin, callBack) => {
                callBack(false, {});
            });
            spyOn(requestPromise, 'get').and.returnValue(Promise.resolve(`
                <title>Calcula tu Menú</title>
                <meta name="description" content="Calcula tu Menú rules">
            `));

            request.post(`${apiUrl}`, { json: post }, (error, response, body) => {
                expect(response.body).toEqual({});
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it('should get 500 as status code', (done) => {
            spyOn(Pins, 'create').and.callFake((pin, callBack) => {
                callBack(true, {});
            });
            request.post(`${apiUrl}`, { json: post }, (error, response, body) => {
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });
    describe('PUT', () => {
        it('should get 200 as status code', (done) => {
            const pin = {id: 22};
            spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, body, callBack) => {
                callBack(false, pin);
            });
            request.put(`${apiUrl}/${pin.id}`, { json: pin }, (error, response, body) => {
                expect(error).toBeNull();
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(pin);
                done();
            })
        });
        it('should get 500 as status code', (done) => {
            const pin = {id: 22};
            spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, body, callBack) => {
                callBack(true, null);
            });
            request.put(`${apiUrl}/${pin.id}`, { json: pin }, (error, response, body) => {
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });
    describe('DELETE', () => {
        it('should get 200 as status code', (done) => {
            const pin = {id: 22};
            spyOn(Pins, 'findByIdAndRemove').and.callFake((id, body, callBack) => {
                callBack(false, pin);
            });
            request.delete(`${apiUrl}/${pin.id}`, { json: pin }, (error, response, body) => {
                expect(error).toBeNull();
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(pin);
                done();
            })
        });
        it('should get 500 as status code', (done) => {
            const pin = {id: 22};
            spyOn(Pins, 'findByIdAndRemove').and.callFake((id, body, callBack) => {
                callBack(true, null);
            });
            request.delete(`${apiUrl}/${pin.id}`, { json: pin }, (error, response, body) => {
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });
});