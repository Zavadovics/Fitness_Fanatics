import request from 'supertest';
import mongoose from 'mongoose';
import User from '../models/User';
import app from '../app.js';
import testdb from './test_db.js';
import jwt from 'jsonwebtoken';

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
  password: 'titkosjelszo',
};

const userId = '61023b3022613e002a2fa374';

const authToken = jwt.sign({ tokenId: userId }, process.env.TOKEN_SECRET);

describe('Test for registering user, fetching logged-in user details, updating user details, updating password', () => {
  it('POST /user should respond with 200', async () => {
    await request(app)
      .post('/api/user')
      .send(userData)
      .expect(200)
      .then(response => {
        expect(response.body.message).toBeTruthy();
      });
  });

  it('GET /user/:id should respond with 200', async () => {
    await request(app)
      .get(`/api/user/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .then(response => {
        expect(response).toBeTruthy();
      });
  });

  it('PUT /user/:id should respond with 200', async () => {
    const newUserData = {
      firstName: 'Geza',
      lastName: 'Mezga',
      email: 'tesztelod@gmail.com',
      password: 'titkosjelszo',
    };

    await request(app)
      .put(`/api/user/${userId}`)
      .send(newUserData)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .then(response => {
        expect(response).toBeTruthy();
      });
  });

  //   it('PUT /user/password should respond with 200', async () => {
  //     const newUserData = {
  //       password: 'legujabbjelszo',
  //     };

  //     await request(app)
  //       .put(`/api/password`)
  //       .send(newUserData)
  //       .expect(200)
  //       .then(response => {
  //         expect(response).toBeTruthy();
  //       });
  //   });
});
