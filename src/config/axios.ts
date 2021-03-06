import axios from 'axios';

export interface ServerResponse<T> {
  data: T;
}

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://tcuserverv2.herokuapp.com'
      : 'http://localhost:5000',
});
