import { isEmpty } from 'lodash';

export abstract class AbstractResource {
  public statusCode: number;

  public message: string;

  public resource: object;

  constructor({
    statusCode,
    message,
    resource,
  }: {
    statusCode?: number;
    message?: string;
    resource?: object;
  }) {
    this.resource = resource || {};
    this.statusCode = statusCode || 200;
    this.message = message || '';
  }

  protected toJson = (): object => {
    if (isEmpty(this.resource)) {
      return {};
    }

    return this.resource;
  };

  private toArray = (obj: object): Array<string> => Object.keys(obj).map(k => obj[k]);
}
