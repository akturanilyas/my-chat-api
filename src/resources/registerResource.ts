import { User } from '../models/user';
import { AbstractResource } from './abstractResource';

export class RegisterResource extends AbstractResource {
  public toJson = (): object => {
    const user = this.resource as User;

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      age: user.age,
    };
  };
}
