import { RequestHandler } from 'express';
import * as UserModel from '../models/user.model';
import CustomError from '../utils/customError';
import { decryptPassword, hashPassword } from '../utils/hashPassworsd';
import { generateToken } from '../utils/jwtToken';

export const RegisterController: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError('auth.error.missingParams', 400);
    const currentEmail = await UserModel.findUserByEmail(email);
    if (currentEmail) throw new CustomError('auth.error.exists', 400);
    const encryptedPassword = await hashPassword(password);
    const user: any = await UserModel.createUser(email, encryptedPassword);
    // console.log('user', user.toObject());
    const token = generateToken({ _id: user._id });
    res.json({
      user: {
        _id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    // console.error('err[RegisterController]', err);
    next(err);
  }
};

export const LoginController: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError('auth.error.missingParams', 400);
    const user: any = await UserModel.findUserByEmail(email);
    if (!user) throw new CustomError('auth.error.notExists', 400);
    const isVerified = await decryptPassword(user.password, password);
    // console.log('isVerified', isVerified);
    if (!isVerified) throw new CustomError('auth.error.invaildPassword', 400);
    const token = generateToken({ _id: user._id });
    res.json({ user: { _id: user._id, email: user.email }, token });
  } catch (err) {
    // console.error('err[LoginController]', err);
    next(err);
  }
};
