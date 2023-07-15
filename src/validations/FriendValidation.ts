import { Schema } from 'express-validator';
import { AbstractValidation } from './AbstractValidation';

export class FriendValidation extends AbstractValidation {
  public addFriendValidation = (): Schema => ({
    user_id: {
      isString: true,
      notEmpty: true,
    },
  });

  public removeFriendValidation = (): Schema => ({
    user_id: {
      isString: true,
      notEmpty: true,
    },
  });

  public acceptFriendValidation = (): Schema => ({});

  public rejectFriendValidation = (): Schema => ({});
}
