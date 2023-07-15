import { AbstractResource } from '../AbstractResource';
import { User } from '../../models/User';

export class SearchResource extends AbstractResource {
  public toJson(resource: object): object {
    const users = resource as Array<User>;

    return users.map((user) => ({
      full_name: user.getFullName(),
      username: user.username,
    }));
  }
}
