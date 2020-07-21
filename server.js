const express = require("express");
const server = express();
const projectRouter = require("./projects/projectRouter");
server.use(express.json());
server.use(logger);

server.use("/api/projects", projectRouter);

//custom middleware

function notFound(req, res) {
  res.status(404).send(`<h2>${req.url}? Ain't nobody got time for dat! </h2>`);
}

function logger(req, res, next) {
  console.log(`Request Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Timestamp: ${new Date()}`);
  next();
}

server.use(notFound);

module.exports = server;
