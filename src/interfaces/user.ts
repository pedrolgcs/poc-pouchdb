export type Gender = 'male' | 'female';

export type User = {
  name: string;
  email: string;
  gender: string;
};

export type UserSchema = {
  _id: string;
  _rev: string;
  user: User;
};
