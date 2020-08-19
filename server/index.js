"use strict";

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const { createGraphqlServer } = require("./graphql");

const COOKIE_NAME = 'COOKIE_NAME';
const COOKIE_VALUE = 'COOKIE_VALUE';

// Create express app
const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.send("error");
});

// Cors + Cookie middleware
app.use(cors({ origin: false }));
app.use(cookieParser('super_secret'));

// Login route to add cookie
app.use('/login', (req, res) => {
  res.cookie(COOKIE_NAME, COOKIE_VALUE);
  res.send('cookie added');
})

// Log cookie used in graphql request
app.use('/graphql', (req, res, next) => {
  console.info('Cookie:', req.signedCookies.COOKIE_NAME);
  next();
})
const graphqlServer = createGraphqlServer();
graphqlServer.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 4001, host: '0.0.0.0' });
