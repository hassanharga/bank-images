import { Express } from 'express';
import UserRouters from './user.routes';
import ImagesRouters from './images.routes';

export default (app: Express) => {
  app.use('/api/user', UserRouters);
  app.use('/api/image', ImagesRouters);
};
