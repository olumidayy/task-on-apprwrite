import { Client, Databases } from 'node-appwrite';
import config from '.';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(config.projectID)
  .setKey(config.appwriteKey);

export default new Databases(client);
