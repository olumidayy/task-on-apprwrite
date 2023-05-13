interface ApiErrorProps {
  message: string;
  code?: number;
}

export class ApiError extends Error {
  code?: number;
  constructor (props: ApiErrorProps) {
    super();
    this.message = props.message;
    this.code = props.code;
  }
}