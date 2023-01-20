const express = require("express");
const bodyParser = require("body-parser");

const { PORT, REMINDER_BINDING_KEY } = require("./config/serverConfig");
// const { sendBasicEmail } = require("./services/email-service");
const { create } = require("./controllers/ticket-controller");
const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const { subscribeEvents } = require("./services/email-service");
const jobs = require("./utils/jobs");

const app = express();

const setUpAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const channel = await createChannel();
  subscribeMessage(channel, subscribeEvents, REMINDER_BINDING_KEY);

  app.post("/api/v1/tickets", create);

  app.listen(PORT, () => {
    console.log(`server started and running at port ${PORT}`);
    jobs();
    // sendBasicEmail(
    //   "ashishdeveloper8076@gmail.com",
    //   "sharmaash234@gmail.com",
    //   "This is testing mail",
    //   "hey! how are you?"
    // );
  });
};

setUpAndStartServer();
