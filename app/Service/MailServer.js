const Mailer = require("nodemailer");
const { smtp } = require("../../Config");

const mail = Mailer.createTransport(smtp);

async function sendMail({ to, subject, text }) {
  let options = { from: smtp.auth.user, to, subject, text };
  try {
    return await _private_send(options);
  } catch (err) {
    return false;
  }
}

function _private_send(obj) {
  return new Promise((resolve, reject) => {
    mail.sendMail(obj, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

module.exports = sendMail;
