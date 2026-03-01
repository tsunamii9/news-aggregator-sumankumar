const request = require('supertest');
const app = require('../src/app');

let token;

beforeAll(async () => {
  await request(app).post('/auth/register').send({
    name: 'Pref User',
    email: 'pref@example.com',
    password: '123456'
  });

  const res = await request(app).post('/auth/login').send({
    email: 'pref@example.com',
    password: '123456'
  });

  token = res.body.token;
});

describe('User Preferences', () => {

  test('Should update preferences', async () => {
    const res = await request(app)
      .put('/users/preferences')
      .set('Authorization', `Bearer ${token}`)
      .send({
        categories: ['technology'],
        language: 'en'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.preferences.categories).toContain('technology');
  });

  test('Should get preferences', async () => {
    const res = await request(app)
      .get('/users/preferences')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.preferences.language).toBe('en');
  });

});