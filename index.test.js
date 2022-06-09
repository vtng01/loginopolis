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
        const testUserData = { username: 'bobbysmiles', password: 'youllneverguess' };
        let response;
        beforeAll(async () => {
            response = await request(app)
                .post('/register')
                .send(testUserData)
                .catch(err => console.error(err));
        });
        it('should send back success with username', async () => {
            expect(response.status).toBe(200);
            expect(response.text).toBe('successfully created user bobbysmiles');
        });
        it('should create user with username', async () => {
            const foundUser = await User.findOne({ where: { username: 'bobbysmiles' } });
            expect(foundUser).toBeTruthy();
            expect(foundUser.username).toBe('bobbysmiles');
        });
    });
});
