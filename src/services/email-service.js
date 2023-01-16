const sender = require("../config/emailConfig");

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

module.exports = {
  sendBasicEmail,
};
