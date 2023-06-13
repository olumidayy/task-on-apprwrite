import * as nodemailer from 'nodemailer';
import { logger } from '../common';
import config from '../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.password,
  },
});

class MailerService {
  static async sendWelcomeMail(user, otp) {
    const mailOptions = {
      from: 'Task On <welcome@task-on.app>',
      to: user.email,
      subject: 'Welcome to Task On',
      html: `<div>Hello ${user.firstname},<div/>
      <div>Welcome to Task On!<div/>
      <div>Confirm your email with this OTP: ${otp}</div>.
      <div>With love from,<div/>
      <div>Task On<div/>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.info(error);
      } else {
        logger.info(`Email sent: ${info.response}`);
      }
    });
  }

  static async sendOTP(user, otp) {
    const mailOptions = {
      from: 'Task On <support@task-on.app>',
      to: user.email,
      subject: 'One Time Password',
      html: `<div>Hello ${user.firstname},<div/>
      <div>Your OTP is: ${otp}</div>
      <div>Ignore this email if you haven't requested for an OTP.
      <div>With love from,<div/>
      <div>Task On<div/><div/>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.info(error);
      } else {
        logger.info(`Email sent: ${info.response}`);
      }
    });
  }

  static async verifiedEmail(user) {
    const mailOptions = {
      from: 'Task On <support@task-on.app>',
      to: user.email,
      subject: 'Account Verified',
      html: `<div>Hello ${user.firstname},<div/>
      <div>Thank you for verifying your account.
      <div>With love from,<div/>
      <div>Task On<div/></div>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.info(error);
      } else {
        logger.info(`Email sent: ${info.response}`);
      }
    });
  }
}

export default MailerService;
