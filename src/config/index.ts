import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {

  port: process.env.PORT || 8000,

  host: process.env.HOSTNAME || 'localhost',

  databaseURL: process.env.DB_URL || '',

  saltRounds: process.env.SAlT_ROUNDS || 10,

  jwtSecretKey: process.env.JWT_SECRET_KEY || '',

  appwriteKey: process.env.APPWRITE_KEY,

  api: {
    prefix: '/api',
  },

};
