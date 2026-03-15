const app = require('./app');
const { PORT } = require('./config/env');

const { startNewsRefresher } = require('./utils/scheduler');

startNewsRefresher();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});