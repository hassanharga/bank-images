import { NextFunction, Response } from 'express';
import { findClinicianById } from '../models/user.model';
import { verifyJWTToken } from '../utils/jwtToken';

export default async (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ msg: req.__('auth.error.login') });

  const token = authorization.split(' ')[1];
  if (!token) return res.status(401).json({ msg: req.__('auth.error.login') });

  const valid: any = verifyJWTToken(token);

  if (!valid)
    return res.status(401).json({ msg: req.__('auth.error.notAuthorized') });

  const user = await findClinicianById(valid._id);

  if (!user)
    return res.status(401).json({ msg: req.__('auth.error.notAuthorized') });

  req.decoded = user;

  return next();
};
