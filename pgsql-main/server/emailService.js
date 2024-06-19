// emailService.js

const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use SSL
  auth: {
    user: 'thakuraman8630@gmail.com',
    pass: 'sdqgihpkffcyipzj',
  }
});


// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'thakuraman8630@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;