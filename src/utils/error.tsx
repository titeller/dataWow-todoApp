import axios, { AxiosError } from "axios";
import { messageError } from '../constants/error'

export const handleError = (message?: string) => {
  alert(message ? message : messageError);
};

export const xhrError = (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    handleError();
    console.log('error message: ', error.message);
    return error.message;
  } else {
    handleError();
    console.log('unexpected error: ', error);
    return 'An unexpected error occurred';
  }
};