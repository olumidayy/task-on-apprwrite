import pino from 'pino';

const logger = pino({
  name: 'app',
  level: 'debug',
});

export default logger;
