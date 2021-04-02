import { types } from '../types';
import {
  AsyncActionError,
  AsyncActionFinish,
  AsyncActionStart,
  CLearErrorAction,
} from './loadingInterfaces';

export const asyncActionStart = (): AsyncActionStart => {
  return {
    type: types.ASYNC_ACTION_START,
  };
};

export const asyncActionFinish = (): AsyncActionFinish => {
  return {
    type: types.ASYNC_ACTION_FINISH,
  };
};

export const asyncActionError = (error: string): AsyncActionError => {
  console.log(error);

  return {
    type: types.ASYNC_ACTION_ERROR,
    payload: error,
  };
};

export const clearError = (): CLearErrorAction => {
  return {
    type: types.CLEAR_ERROR,
  };
};
