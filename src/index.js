const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const app = express();

const setUpAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(PORT, () => {
    console.log(`server started and running at port ${PORT}`);
  });
};

setUpAndStartServer();