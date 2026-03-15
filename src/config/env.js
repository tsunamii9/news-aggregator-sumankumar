require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  NEWS_API_KEY: process.env.NEWS_API_KEY,
  NEWS_API_BASE_URL: process.env.NEWS_API_BASE_URL
};