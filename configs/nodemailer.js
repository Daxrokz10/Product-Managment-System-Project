const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    debug: true,
    logger: true,
  },
  tls: {
    rejectUnauthorized: false,       // sometimes needed in cloud servers
  },
  connectionTimeout: 10000, // Increase timeout to 10 seconds
});

module.exports = transporter;
