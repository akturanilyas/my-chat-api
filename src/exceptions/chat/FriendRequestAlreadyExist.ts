import { AbstractException } from '../AbstractException.abstract';

export class ChatAlreadyExist extends AbstractException {
  status = 409;
  message = 'Chat Already Exist';
}
