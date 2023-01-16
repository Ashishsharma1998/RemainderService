const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./services/email-service");
const app = express();

const setUpAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(PORT, () => {
    console.log(`server started and running at port ${PORT}`);
    sendBasicEmail(
      "ashishdeveloper8076@gmail.com",
      "sharmaash234@gmail.com",
      "This is testing mail",
      "hey! how are you?"
    );
  });
};

setUpAndStartServer();
