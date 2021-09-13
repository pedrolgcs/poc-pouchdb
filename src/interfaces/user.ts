export type User = {
  name: string;
  email: string;
  phone: string;
};

export type Situation = 'pending' | 'success' | 'failed'

export type UserSchema = {
  _id: string;
  _rev: string;
  user: User;
  situation: Situation;
  error: {
    message: string;
    code: number;
  };
};
