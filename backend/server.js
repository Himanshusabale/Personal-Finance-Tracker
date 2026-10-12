const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/constants');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler); // must be last

app.listen(PORT, () => logger.info(`Backend running on http://localhost:${PORT}`));
