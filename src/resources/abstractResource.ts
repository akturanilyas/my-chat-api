import { isEmpty } from 'lodash';

export class AbstractResource {
  public statusCode: number;

  public message: string;

  public resource: object;

  constructor({
    statusCode,
    message,
    resource,
  }: {
    statusCode: number;
    message: string;
    resource: object;
  }) {
    this.resource = resource;
    this.statusCode = statusCode;
    this.message = message;

    this.resource = this.toArray(this.toJson());
    const a = 2;
  }

  protected toJson = (): object => {
    if (isEmpty(this.resource)) {
      return {};
    }

    return this.resource;
  };

  private toArray = (obj: object): Array<string> => Object.keys(obj).map(k => obj[k]);
}
