const express = require('express');
const router = express.Router();
const newsController = require('./news.controller');
const authenticate = require('../../middlewares/auth.middleware');

router.get('/', authenticate, (req, res) =>
  newsController.getPersonalizedNews(req, res)
);

router.get('/search/:keyword', authenticate, (req, res) =>
  newsController.searchNews(req, res)
);


router.post('/:id/read', authenticate, (req, res) =>
  newsController.markAsRead(req, res)
);

router.post('/:id/favorite', authenticate, (req, res) =>
  newsController.markAsFavorite(req, res)
);

router.get('/read', authenticate, (req, res) =>
  newsController.getReadArticles(req, res)
);

router.get('/favorites', authenticate, (req, res) =>
  newsController.getFavoriteArticles(req, res)
);



module.exports = router;