import { model } from 'mongoose';

const UserSchema = model('User');

export const findUserByEmail = async (email: string) => {
  const user = await UserSchema.findOne({ email });
  if (!user) return null;
  return user;
};

export const findClinicianById = async (_id: string) => {
  const user = await UserSchema.findOne({ _id });
  if (!user) return null;
  return user;
};

export const createUser = async (email: string, password: string) => {
  return await UserSchema.create({ email, password });
};
