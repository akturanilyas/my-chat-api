import { User } from '../models/user';
import { AbstractResource } from './abstractResource';

export class RegisterResource extends AbstractResource {
  resource: User;

  toJson = (): object => ({ akturan: 61 });
}
