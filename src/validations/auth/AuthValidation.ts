import { Schema } from 'express-validator';
import { AbstractValidation } from '../AbstractValidation';

export class AuthValidation extends AbstractValidation {
  public static loginValidation = (): Schema => ({
    email: {
      isString: true,
      notEmpty: true,
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