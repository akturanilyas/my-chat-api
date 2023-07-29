import { User } from '../../models/User';
import { AbstractResource } from '../AbstractResource';

export class RegisterResource extends AbstractResource {
  public toJson(resource: object): object {
    const user = resource as User;

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      age: user.age,
    };
  }
}
