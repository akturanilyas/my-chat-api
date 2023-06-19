export interface AbstractExceptionInterface extends Error {
  title: string;
  detail: string | null;
}
