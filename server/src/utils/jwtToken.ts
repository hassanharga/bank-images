import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (fields: any) => {
  return jwt.sign(fields, config.jwt.jwtSecret);
};

export const verifyJWTToken = (jwtToken: any) => {
  try {
    return jwt.verify(jwtToken, config.jwt.jwtSecret);
  } catch (e) {
    return null;
  }
};
