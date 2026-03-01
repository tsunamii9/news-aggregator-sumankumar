const request = require('supertest');
const app = require('../src/app');
const newsService = require('../src/modules/news/news.service');

jest.mock('../src/modules/news/news.service');

let token;

beforeAll(async () => {
    // Register
    await request(app).post('/auth/register').send({
        name: 'News User',
        email: 'news@example.com',
        password: '123456'
    });

    // Login
    const res = await request(app).post('/auth/login').send({
        email: 'news@example.com',
        password: '123456'
    });

    token = res.body.token;

    //  update preferences
    await request(app)
        .put('/users/preferences')
        .set('Authorization', `Bearer ${token}`)
        .send({
            categories: ['technology']
    });

    token = res.body.token;
});


describe('News Endpoints', () => {

  test('Should fetch personalized news', async () => {
    newsService.fetchTopHeadlines.mockResolvedValue({
      totalResults: 1,
      articles: [
        {
          source: { name: 'MockSource' },
          author: 'Author',
          title: 'Test Title',
          description: 'Desc',
          url: 'https://test.com/article',
          urlToImage: '',
          publishedAt: '2026-03-01'
        }
      ]
    });

    const res = await request(app)
      .get('/news')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.articles.length).toBe(1);
  });

});


describe('News Marking', () => {
    test('Should mark article as read', async () => {
        const articleId = 'abc123';

        const res = await request(app)
            .post(`/news/${articleId}/read`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.readArticles).toContain(articleId);
    });
});