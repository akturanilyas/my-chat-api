export abstract class AbstractException extends Error {
  type: string | null = null;
  status: number;

  constructor(message: string | null = null, status = 500) {
    super(message || 'HTTP error');
    this.status = status;
  }
}
