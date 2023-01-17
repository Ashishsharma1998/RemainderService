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

module.exports = {
  sendBasicEmail,
  createNotification,
  updateTicket,
  findPendingEmails,
};
