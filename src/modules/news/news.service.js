const axios = require('axios');
const { NEWS_API_KEY, NEWS_API_BASE_URL } = require('../../config/env');

const https = require('https');
// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false
// });

class NewsService {

  constructor() {
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false   // DEV ONLY
    });
  }

  async fetchEverything(params) {
    try {
      const response = await axios.get(
        `${NEWS_API_BASE_URL}/top-headlines`,
        {
            httpsAgent: this.httpsAgent,
            headers: {
            'X-Api-Key': NEWS_API_KEY
            },
            params
        }
        );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchTopHeadlines(params) {
    try {
      const response = await axios.get(
        `${NEWS_API_BASE_URL}/top-headlines`,
        {
          httpsAgent: this.httpsAgent,
          headers: {
            'X-Api-Key': NEWS_API_KEY
          },
          params
        }
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchSources(params) {
    try {
      const response = await axios.get(
        `${NEWS_API_BASE_URL}/top-headlines/sources`,
        {
            httpsAgent: this.httpsAgent, 
            headers: {
            'X-Api-Key': NEWS_API_KEY
          },
          params
        }
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.log("FULL ERROR OBJECT:", error);

    if (error.response) {
        console.log("RESPONSE DATA:", error.response.data);
        throw new Error(
        `NewsAPI Error: ${error.response.data.message || 'Unknown error'}`
        );
    }

    if (error.request) {
        console.log("NO RESPONSE RECEIVED");
        throw new Error('No response from NewsAPI');
    }

    console.log("UNKNOWN ERROR TYPE");
    throw new Error('News service failed');
    }
}

module.exports = new NewsService();