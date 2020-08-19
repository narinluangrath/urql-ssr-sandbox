"use strict";

const express = require("express");
const pino = require("pino");
const cors = require("cors");
const expressPinoLogger = require("express-pino-logger");
const logger = require('pino')()
const cookieParser = require('cookie-parser');

const { createGraphqlServer } = require("./graphql");

// Create express app
const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500);
  res.send("error");
});

// Logging + Cors + Cookie middleware
app.use(expressPinoLogger({ logger }));
app.use(cors({ origin: false }));
app.use(cookieParser('super_secret'));

// Login route to add cookie
app.use('/login', (req, res) => {
  res.cookie('cookieName', 'cookieValue');
  res.send('cookie added');
})

// Log cookie used in graphql request
app.use('/graphql', (req, res, next) => {
  const cookie = req && req.signedCookies && req.signedCookies.cookieName;
  logger.info(`Cookie: ${cookie}`)
  next();
})
const graphqlServer = createGraphqlServer({ logger });
graphqlServer.applyMiddleware({
  app,
  disableHealthCheck: true,
  path: "/graphql",
});

app.listen({ port: 4001, host: '0.0.0.0' });
