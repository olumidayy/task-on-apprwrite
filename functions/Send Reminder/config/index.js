const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

module.exports = {

  appwriteKey: process.env.APPWRITE_KEY || '',

  projectID: process.env.PROJECT_ID || '',

  databaseID: process.env.DATABASE_ID || '',

  collections: {
    users: process.env.USER_COLLECTION_ID || '',
    tasks: process.env.TASK_COLLECTION_ID || '',
    categories: process.env.CATEGORY_COLLECTION_ID || '',
  },

  mailer: {
    user: process.env.AUTH_EMAIL || '',
    password: process.env.AUTH_PASSWORD || '',
  },

};
