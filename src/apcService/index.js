const { domainService, nats } = require('config');

const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');

const processRouterV1 = require('./routers/v1/process');
const processRouterV1_1 = require('./routers/v1.1/process');
const { natsMessageHandler } = require('./utilities/messageUtil');

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', processRouterV1);
app.use('/api/v1.1', processRouterV1_1);

const run = async () => {
  // subscribe the subject
  if (global.natsClient) {
    global.natsClient.subscribe(nats.stream, `${nats.subject}.params`, `${nats.consumer}_params`, natsMessageHandler);
  }

  return new Promise((resolve, reject) => {
    app.listen(domainService.apc.port, () => {
      resolve();
    });
  });
};

module.exports = {
  run,
};
