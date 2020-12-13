import argon2 from 'argon2';

export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

export const decryptPassword = async (hashed: string, password: string) => {
  try {
    return await argon2.verify(hashed, password);
  } catch (error) {
    return false;
  }
};
