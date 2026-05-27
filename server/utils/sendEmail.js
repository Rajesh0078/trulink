const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html, text }) => {
  return transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;
