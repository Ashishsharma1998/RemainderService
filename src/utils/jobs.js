const cron = require("node-cron");
const sender = require("../config/emailConfig");
const emailService = require("../services/email-service");

/**
 * 10:00 am
 * Every 5 minutes
 * We will check are their any pending emails which was expected to be sent
 * by now  and is pending
 */

const setUpJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    const response = await emailService.findPendingEmails();
    response.forEach((res) => {
      sender.sendMail(
        {
          to: res.recepientEmail,
          subject: res.subject,
          text: res.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await emailService.updateTicket(res.id, { status: "SUCCESS" });
          }
        }
      );
    });
  });
};

module.exports = setUpJobs;
