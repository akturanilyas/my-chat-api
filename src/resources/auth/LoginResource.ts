import { AbstractResource } from '../AbstractResource';

export class LoginResource extends AbstractResource {
  public toJson(resource): object {
    return {
      access_token: (resource as Record<string, unknown>).access_token,
    };
  }
}
