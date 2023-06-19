import { AbstractExceptionInterface } from './AbstractException.interface';

export abstract class AbstractException
  extends Error
  implements AbstractExceptionInterface
{
  type: string | null = null;
  httpStatus = 500;
  title = 'Internal Server Error';
  detail: string | null = null;

  constructor(detail: string | null = null) {
    super(detail || 'HTTP error');
    this.detail = detail;
  }
}
