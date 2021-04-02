import axios from 'axios';

export interface ServerResponse<T> {
  data: T;
}

export const api = axios.create({
  baseURL: 'https://server-tcu-2021.herokuapp.com',
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});
