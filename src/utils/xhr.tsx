import axios from "axios";
import { xhrError } from "./error";

export const get = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error: any) {
    xhrError(error);
    return error;
  };
};

export const post = async (url: string, requestData: any) => {
  try {
    const response = await axios.post(url, requestData);
    return response;
  } catch (error: any) {
    xhrError(error);
    return;
  };
};

export const put = async (url: string, requestData: any) => {
  try {
    const response = await axios.put(url, requestData);
    return response;
  } catch (error: any) {
    xhrError(error);
    return;
  };
};

export const del =(url: string) => {
  try {
    const response = axios.delete(url);
    return response;
  } catch (error: any) {
    xhrError(error);
    return;
  };
};