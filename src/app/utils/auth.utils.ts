import bcrypt from 'bcryptjs';

export const hash = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const compareHash = (plain: string, hash: string): boolean => {
  return bcrypt.compareSync(plain, hash);
};
