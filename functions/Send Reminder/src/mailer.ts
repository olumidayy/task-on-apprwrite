import * as nodemailer from 'nodemailer';
import logger from './logger';
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
  static async sendReminder(user, task, time) {
    let html = `<div>Hello ${user.firstname},<div/>`;
    if (time.hours > 0) {
      html += `<div>Your task: ${task.title}, is due in about ${time.hours} hours.<div/>`;
    } else if (time.minutes === 0) {
      html += `<div>Your task: ${task.title}, is due.<div/>`;
    }
    html += `<div>With love from,<div/>
             <div>Task On<div/>`;
    const mailOptions = {
      from: config.mailer.user,
      to: user.email,
      subject: 'Reminder',
      html,
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
