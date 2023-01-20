const sender = require("../config/emailConfig");
const ticketRepository = require("../repository/ticket-repository");

const TicketRepository = new ticketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    const response = await sender.sendMail({
      to: mailTo,
      from: mailFrom,
      subject: mailSubject,
      text: mailBody,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const findPendingEmails = async () => {
  try {
    const response = await TicketRepository.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTicket = async (ticketId, data) => {
  try {
    const response = await TicketRepository.update(ticketId, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createNotification = async (data) => {
  try {
    const response = await TicketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const subscribeEvents = async (payload) => {
  let service = payload.service;
  let data = payload.data;
  switch (service) {
    case "CREATE_TICKET":
      await createNotification(data);
      break;
    case "SEND_BASIC_EMAIL":
      await sendBasicEmail(data);
      break;
    default:
      console.log("No valid event received!");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  createNotification,
  updateTicket,
  findPendingEmails,
  subscribeEvents,
};
