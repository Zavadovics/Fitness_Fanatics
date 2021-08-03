import request from 'supertest';
import mongoose from 'mongoose';
import User from '../models/User';
import app from '../app.js';
import testdb from './test_db.js';

beforeEach(async () => {
  testdb();
});

afterEach(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

const userData = {
  firstName: 'Elod',
  lastName: 'Teszt',
  email: 'tesztelod@gmail.com',
  password: 'tesztelod',
};

describe('Test Login', () => {
  it('POST /login should respond with 200', async () => {
    const loginData = {
      email: 'tesztelod@gmail.com',
      password: 'tesztelod',
    };

    await User.create(userData);

    await request(app)
      .post('/api/login')
      .send(loginData)
      .expect(200)
      .then(response => {
        expect(response.body.token).toBeTruthy();
      });
  });
});
