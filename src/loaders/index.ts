import { Application } from 'express';
import logger from '../common/logger';
import expressLoader from './express';

export default async ({ expressApp }: { expressApp: Application}) => {
  await expressLoader({ app: expressApp });
  logger.info('- Express loaded');
};
