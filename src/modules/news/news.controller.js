const newsService = require('./news.service');
const userService = require('../users/user.service');
const cache = require('../../utils/cache');
const crypto = require('crypto');


class NewsController {
  async getPersonalizedNews(req, res) {
    try {
      const userId = req.user.userId;

      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const preferencesString = JSON.stringify(user.preferences);
      const hash = crypto.createHash('md5').update(preferencesString).digest('hex');
      const cacheKey = `news:${userId}:${hash}`;

      const cachedNews = cache.get(cacheKey);

      if (cachedNews) {
        return res.status(200).json({
          source: 'cache',
          ...cachedNews
        });
      }

      let news;

      if (user.preferences.categories?.length > 0) {
        news = await newsService.fetchTopHeadlines({
          category: user.preferences.categories[0],
          language: user.preferences.language || 'en',
          pageSize: 20
        });
      } else {
        news = await newsService.fetchEverything({
          q: 'latest',
          language: user.preferences.language || 'en',
          pageSize: 20
        });
      }

      const normalized = this.normalizeResponse(news);

      cache.set(cacheKey, normalized, 300); // 5 min TTL

      return res.status(200).json({
        source: 'api',
        ...normalized
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async markAsRead(req, res) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const updated = await userService.markAsRead(userId, id);

      res.status(200).json({
        message: 'Marked as read',
        readArticles: updated
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async markAsFavorite(req, res) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const updated = await userService.markAsFavorite(userId, id);

      res.status(200).json({
        message: 'Marked as favorite',
        favoriteArticles: updated
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getReadArticles(req, res) {
    try {
      const userId = req.user.userId;
      const read = await userService.getReadArticles(userId);

      res.status(200).json({ readArticles: read });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getFavoriteArticles(req, res) {
    try {
      const userId = req.user.userId;
      const favorites = await userService.getFavoriteArticles(userId);

      res.status(200).json({ favoriteArticles: favorites });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  async searchNews(req, res) {
    try {
      const userId = req.user.userId;
      const { keyword } = req.params;

      if (!keyword || keyword.length < 2) {
        return res.status(400).json({
          message: 'Keyword must be at least 2 characters'
        });
      }

      const cacheKey = `search:${userId}:${keyword.toLowerCase()}`;
      const cached = cache.get(cacheKey);

      if (cached) {
        return res.status(200).json({
          source: 'cache',
          ...cached
        });
      }

      const news = await newsService.fetchEverything({
        q: keyword,
        language: 'en',
        pageSize: 20,
        sortBy: 'publishedAt'
      });

      const normalized = this.normalizeResponse(news);

      cache.set(cacheKey, normalized, 300);

      return res.status(200).json({
        source: 'api',
        ...normalized
      });

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  normalizeResponse(newsData) {
    const crypto = require('crypto');

    return {
      totalResults: newsData.totalResults,
      articles: newsData.articles.map(article => {
        const id = crypto
          .createHash('md5')
          .update(article.url)
          .digest('hex');

        return {
          id,
          source: article.source.name,
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.url,
          image: article.urlToImage,
          publishedAt: article.publishedAt
        };
      })
    };
  }

}

module.exports = new NewsController();