import * as jwt from 'jsonwebtoken';
import { trimStart } from 'lodash';
import environment from '../builders/envBuilder';

export const getUserIdByToken = (token: string): string => {
  if (token.startsWith('Bearer ')) {
    const a = trimStart(token, 'Bearer');
    const b = trimStart(a);

    const c = process.env.jwt_token;

    return jwt.verify(trimStart(b), environment.jwt_token as string)?.id;
  }

  return jwt.verify(token, environment.jwt_token as string)?.id;
};
