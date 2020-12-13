import { Config } from '../types/config';
import dev from './config.dev';
import production from './config.production';
import uat from './config.uat';

const env = process.env.NODE_ENV || 'dev';

const configFiles: any = {
  dev,
  production,
  uat,
};

const config: Config = configFiles[env];

export default config;
