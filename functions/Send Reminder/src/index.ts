import DateDiff from 'date-diff';
import { Client, Databases } from 'node-appwrite';
import MailerService from './mailer';
import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default async function sendReminders(req, res) {
  const client = new Client()
    .setEndpoint('')
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
    const task: any = tasks.documents[i];
    if (task.deadline && task.deadline <= date) {
      const dateDifference = new DateDiff(task.deadline, date);
      const hours = dateDifference.hours();
      const minutes = dateDifference.minutes();
      if (hours === 24 || hours === 1 || minutes === 0) {
        if (users[task.user]) {
          MailerService.sendReminder(users[task.user], task, { hours, minutes });
        } else {
          databases.getDocument(
            config.databaseID,
            config.collections.tasks,
            task.user,
          ).then((user) => {
            users[task.user] = user;
            MailerService.sendReminder(user, task, { hours, minutes });
          });
        }
      }
    }
  }
}
