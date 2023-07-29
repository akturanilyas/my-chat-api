import { AbstractResource } from '../AbstractResource';
import { Friend } from '../../models/Friend';

export class RemoveFriendResource extends AbstractResource {
  public toJson(resource: object): object {
    const _resource = resource as Friend;

    return {
      id: _resource.id,
    };
  }
}
