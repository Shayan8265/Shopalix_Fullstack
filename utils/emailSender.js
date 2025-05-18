const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',  // or your SMTP service
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function sendOTPEmail(to, otp) {
  const mailOptions = {
    from: `"Shopalix Support" <${process.env.MAIL_USER}>`,
    to,
    subject: "Your Shopalix OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendOTPEmail;
