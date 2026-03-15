const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {

  test('Register user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('test@example.com');
  });

  test('Login user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});