import { Request } from 'express';

export interface RegisterUserRequest extends Request {
  password: string;
  username: string;
  first_name: string;
  email: string;
  last_name: string;
  age: number;
}
