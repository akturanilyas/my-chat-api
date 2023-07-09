import { AbstractResource } from '../AbstractResource';
import { User } from '../../models/User';

export class SearchResource extends AbstractResource {
  public toJson = (): object => {
    const user = this.resource as User;

    return {
      name: user.getFullName(),
      username: user.username,
    };
  };
}
