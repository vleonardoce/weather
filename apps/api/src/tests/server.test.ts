/* eslint-disable @typescript-eslint/no-var-requires */

const supertest = require('supertest');
const { app, server } = require('../main');

const api = supertest(app);

test('get data as json', async () => {
    await api
        .get('/api/countries')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('get countries', async () => {
    const response = await api
        .get('/api/countries');

    expect(response.body.length).toBeGreaterThan(1);
});

test('get city info', async () => {
    const response = await api
        .get('/api/cities/3690875');

    expect(response.body.city).toBeDefined();
    expect(response.body.weathers).toHaveLength(6);
});

afterAll(() => {
    server.close();
})

