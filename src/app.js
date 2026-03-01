const express = require('express');
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const newsRoutes = require('./modules/news/news.routes');
const errorHandler = require('./middlewares/error.middleware');
const app = express();



app.use(express.json());

app.use('/users', userRoutes);

app.use('/news', newsRoutes);

app.use('/auth', authRoutes);

app.use(errorHandler);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;