const app = require('./index');
const { sequelize, User } = require('./db');
const request = require('supertest');
const seed = require('./db/seedFn');
const seedData = require('./db/seedData');


describe('Endpoints', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // recreate db
        await seed();
    });

    describe('GET /', () => {
        it('should return html', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.text).toBe('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
        });
    });

    describe('POST /register', () => {
        it('should send back success with username', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    username: 'bobbysmiles',
                    password: 'youllneverguess'
                });
            expect(response.status).toBe(200);
            expect(response.text).toBe('successfully created user bobbysmiles');
        });
    });
});
