import { Client, Databases, Storage } from 'node-appwrite';
import config from '.';

const appwrite = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(config.projectID)
  .setKey(config.appwriteKey);

const client = new Databases(appwrite);
const storage = new Storage(appwrite);
export {
  client,
  storage,
};
