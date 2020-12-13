// import schemas
import '../schemas';

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import i18n from 'i18n';
import cors from 'cors';
import fileupload from 'express-fileupload';
import routes from '../routes';
// import path from 'path';
import CustomError from '../utils/customError';

const app = express();

app.use(fileupload());

i18n.configure({
  locales: ['en', 'ar'],
  directory: `${__dirname}/../locales`,
  syncFiles: true,
  objectNotation: true,
});

// middlewares
app.use(i18n.init);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '..', 'uploads')));

// routes
routes(app);

app.use(
  (
    err: CustomError | any,
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const message = req.__(err.message) || 'server error';
    const status = err.status || 500;
    return res.status(status).json({ msg: message, status });
  }
);

export default app;
