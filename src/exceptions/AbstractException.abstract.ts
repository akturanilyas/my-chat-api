import { AbstractExceptionInterface } from './AbstractException.interface';

export abstract class AbstractException
  extends Error
  implements AbstractExceptionInterface
{
  type: string | null = null;
  status;
  title = 'Internal Server Error';
  detail: string | null = null;

  constructor(detail: string | null = null, status = 500) {
    super(detail || 'HTTP error');
    this.detail = detail;
    this.status = status;
  }
}
