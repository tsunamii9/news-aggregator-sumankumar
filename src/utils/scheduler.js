const newsService = require('../modules/news/news.service');
const cache = require('./cache');

function startNewsRefresher() {
  setInterval(async () => {
    try {
      console.log('Refreshing technology news cache...');

      const news = await newsService.fetchTopHeadlines({
        category: 'technology',
        language: 'en',
        pageSize: 20
      });

      cache.set('global:technology', news, 300);

    } catch (error) {
      console.error('Background refresh failed:', error.message);
    }
  }, 5 * 60 * 1000); // every 5 minutes
}

module.exports = { startNewsRefresher };