const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/constants');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Allow the browser to call this API from any website (including your Vercel frontend)
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // answer preflight requests

app.use(express.json());
app.get('/', (req, res) => res.send('Finance Tracker API is running'));
app.use('/api', routes);
app.use(errorHandler); // must be last

// Start the server only when running locally (Vercel runs the app itself)
if (require.main === module) {
  app.listen(PORT, () => logger.info(`Backend running on http://localhost:${PORT}`));
}

module.exports = app;
