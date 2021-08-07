import request from 'supertest';
import mongoose from 'mongoose';
import Photo from '../models/Photo';
import app from '../app.js';
import testdb from './test_db.js';
import jwt from 'jsonwebtoken';

beforeEach(async () => {
  testdb();
});

afterEach(async () => {
  await Photo.deleteMany();
  await mongoose.connection.close();
});

const photoData = {
  user_id: '60fc016e026bee97315ba1e4',
  user_email: 'tesztelod@gmail.com',
  avatar:
    'https://res.cloudinary.com/dywtied0r/image/upload/v1627924778/j4xzkn4eiehttzqgev8i.jpg',
  cloudinary_id: 'j4xzkn4eiehttzqgev8i',
};

// const userId = '61023b3022613e002a2fa374';

const authToken = jwt.sign(
  { tokenId: photoData.user_id },
  process.env.TOKEN_SECRET
);

describe('Test for fetching/uploading/changing/deleting user photo', () => {
  it('GET /photo/:id should respond with 200', async () => {
    await request(app)
      .get(`/api/photo/${photoData.user_id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .then(response => {
        expect(response).toBeTruthy();
      });
  });

  //   it('PUT /photo/:id should respond with 200', async () => {
  //     await request(app)
  //       .put(`/api/photo/${photoData.user_id}`)
  //       .send(photoData)
  //       .set('Authorization', `Bearer ${authToken}`)
  //       .expect(200)
  //       .then(response => {
  //         expect(response).toBeTruthy();
  //       });
  //   });

  //   it('DELETE /photo/:id should respond with 200', async () => {
  //     await request(app)
  //       .delete(`/api/photo/${photoData.user_id}`)
  //       .set('Authorization', `Bearer ${authToken}`)
  //       .expect(200)
  //       .then(response => {
  //         expect(response.body).toBeTruthy();
  //       });
  //   });
});
