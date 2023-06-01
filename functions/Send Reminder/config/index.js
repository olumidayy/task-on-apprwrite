const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

module.exports = {

  appwriteKey: process.env.APPWRITE_KEY || '3510bacb5b6d8bf8039485c49dae5bb49131cd47ea300ed1ca886c3712e639c2769eb13f7227a047f5fb5cf6fa6b2885e52935cbfe5eb557c2045313c36b303f0434da0189c11c39e98f20802078f8463c4c51aefff2a19e5a9fa405c4ccc18ffbe9fb6011cecb7e8a7081f5bc7367e147bd4b5d1250b01c0cac7f167e12877d',

  projectID: process.env.PROJECT_ID || '647472479bb4531ac227',

  databaseID: process.env.DATABASE_ID || '647472db1d0ece67dd41',

  collections: {
    users: process.env.USER_COLLECTION_ID || '64747307a0c7274fdb8b',
    tasks: process.env.TASK_COLLECTION_ID || '647495eb934734e7d02f',
    categories: process.env.CATEGORY_COLLECTION_ID || '647495eb934734e7d02f',
  },

  mailer: {
    user: process.env.AUTH_EMAIL || 'lumiyken@gmail.com',
    password: process.env.AUTH_PASSWORD || 'oeadwwodvdtyfgvf',
  },

};
