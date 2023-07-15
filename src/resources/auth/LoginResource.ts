import { AbstractResource } from '../AbstractResource';

export class LoginResource extends AbstractResource {
  public toJson = (): object => ({
    access_token: (this.resource as Record<string, unknown>).access_token,
  });
}
