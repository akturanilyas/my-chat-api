import { body, Schema } from 'express-validator';
import { AbstractValidation } from '../AbstractValidation';

export const exloginValidation = [
  body('email').isEmail().withMessage('Provide valid email'),
];

export class AuthValidation extends AbstractValidation {
  public static loginValidation = (): Schema => ({
    email: {
      isString: true,
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Provide valid email.',
    },
    password: {
      isString: true,
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Provide valid password.',
    },
  });
}