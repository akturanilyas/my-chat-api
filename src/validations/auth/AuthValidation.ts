import { Schema } from 'express-validator';
import { AbstractValidation } from '../AbstractValidation';

export class AuthValidation extends AbstractValidation {
  public loginValidation = (): Schema => ({
    email: {
      isString: true,
      notEmpty: true,
      matches: { options: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ },
      errorMessage: 'Provide valid email.',
    },
    password: {
      isString: true,
      notEmpty: true,
      errorMessage: 'Provide valid password.',
    },
  });

  public registerValidation = (): Schema => ({
    email: {
      isString: true,
      notEmpty: true,
      matches: { options: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ },
      errorMessage: 'Provide valid email.',
    },
    password: {
      isString: true,
      notEmpty: true,
      errorMessage: 'Provide valid password.',
    },
    first_name: {
      isString: true,
      notEmpty: true,
      errorMessage: 'Provide valid first name.',
    },
    last_name: {
      isString: true,
      notEmpty: true,
      errorMessage: 'Provide valid last name.',
    },
    username: {
      isString: true,
      notEmpty: true,
      errorMessage: 'Provide valid username.',
    },
    age: { isEmpty: true, isNumeric: true },
  });
}
