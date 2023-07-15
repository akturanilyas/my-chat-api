import { User } from '../../models/User';
import { AbstractResource } from '../AbstractResource';

export class SelfResource extends AbstractResource {
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
