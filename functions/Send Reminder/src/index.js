const DateDiff = require('date-diff');
const { Client, Databases } = require('node-appwrite');
const MailerService = require('./mailer');
const config = require('../config');
const logger = require('./logger');

module.exports = async function sendReminders(req, res) {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(config.projectID)
    .setKey(config.appwriteKey);
  const databases = new Databases(client);
  const tasks = await databases.listDocuments(
    config.databaseID,
    config.collections.tasks,
  );
  const date = new Date();
  const users = {};
  for (let i = 0; i < tasks.total; i += 1) {
    const task = tasks.documents[i];
    if (task.deadline && task.deadline <= date) {
      const dateDifference = new DateDiff(task.deadline, date);
      const hours = dateDifference.hours();
      const minutes = dateDifference.minutes();
      if (hours === 24 || hours === 1 || minutes === 0) {
        logger.info(`Task: ${task.$id} - ${task.name}, hours: ${hours}, minutes: ${minutes}`);
        if (users[task.user]) {
          MailerService.sendReminder(users[task.user], task, { hours, minutes });
        } else {
          databases.getDocument(
            config.databaseID,
            config.collections.users,
            task.user,
          ).then((user) => {
            users[task.user] = user;
            MailerService.sendReminder(user, task, { hours, minutes });
          });
        }
      }
    }
  }
  return res.json({
    message: 'Function executed.',
  });
};
