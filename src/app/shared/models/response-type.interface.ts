export interface IResponse<T> {
    responseType: ResponseType;
    message: string;
    data?: T;
  }
  
  export enum ResponseType {
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning',
    Info = 'Info',
  }