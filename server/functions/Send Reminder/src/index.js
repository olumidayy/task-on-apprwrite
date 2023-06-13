/* eslint-disable no-console */
const DateDiff = require('date-diff').default;
const { Client, Databases } = require('node-appwrite');
const MailerService = require('./mailer');
const config = require('../config');

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
    const task = tasks?.documents[i];
    if (task.deadline) {
      const deadline = new Date(task.deadline);
      const dateDifference = new DateDiff(deadline, date);
      const hours = Math.round(dateDifference.hours());
      const minutes = Math.round(dateDifference.minutes());
      console.log(`Task: ${task.$id} - ${task.title}, hours: ${hours}, minutes: ${minutes}`);
      if (hours === 24 || hours === 1 || minutes === 0) {
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
        if (task.assignee) {
          if (users[task.assignee]) {
            MailerService.sendReminder(users[task.assignee], task, { hours, minutes });
          } else {
            databases.getDocument(
              config.databaseID,
              config.collections.users,
              task.assignee,
            ).then((user) => {
              users[task.assignee] = user;
              MailerService.sendReminder(user, task, { hours, minutes });
            });
          }
        }
      }
    }
  }
  return res.json({
    message: 'Function executed.',
  });
};
