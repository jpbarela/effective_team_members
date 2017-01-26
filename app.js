/* eslint no-console: 0 */
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

const routes = require('./routes');
const models = require('./models');

app.use(bodyParser.json());
app.use('/', routes);

models
  .connection
  .then(() => {
    app.listen(config.port, () => {
      // TODO: add a better logger
      console.log('Express server listening on port %d in %s mode', config.port,
        process.env.NODE_ENV);
    });
  });
