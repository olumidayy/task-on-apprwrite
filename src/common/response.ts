interface ApiResponseProps {
  success: boolean;
  code: number;
  message: string;
  data?: any;
}

export class ApiResponse {
  public success: boolean;
  public code: number;
  public message: string;
  public data?: any;
  
  constructor(props: ApiResponseProps){
    this.success = props.success;
    this.code = props.code;
    this.message = props.message;
    this.data = props.data;
  }
}