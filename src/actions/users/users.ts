import {
  CreateUser,
  FetchUsers,
  FetchSelectedUser,
  UpdateUser,
  DeleteUser,
  ClearSelectedUser,
} from './userInterfaces';
import { Dispatch } from 'redux';
import { api } from '../../config/axios';
import { AuthPayload } from '../auth';
import { asyncActionFinish, asyncActionStart } from '../loading/loading';
import { types } from '../types';
import { toast } from 'react-toastify';

export const generateNewUserPassword = (userId: string, callback: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.patch(`/users/reset-password-admin/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      callback();
      toast.success(data.msg);
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const createUser = (user: AuthPayload, cb: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.post('/users', user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch<CreateUser>({ type: types.CREATE_USER, payload: data });
      toast.success(`Usuario ${data.name} ${data.lastName} creado`);
      cb();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const updateUserData = (
  userId: string | null,
  user: AuthPayload,
  cb: () => void
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.patch(`/users/${userId}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch<UpdateUser>({ type: types.UPDATE_USER, payload: data });
      toast.success('Usuario actualizado');
      cb();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const deleteUser = (userId: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch<DeleteUser>({ type: types.DELETE_USER, payload: userId! });
      toast.success('Usuario eliminado');
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const fetchSelectedUser = (userId: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch<FetchSelectedUser>({ type: types.FETCH_SELECTED_USER, payload: data });
    } catch (error: any) {
      toast.error(error.response);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const fetchUsers = (page: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch<FetchUsers>({
        type: types.FETCH_USERS_DATA,
        payload: { users: data.users, totalPages: data.totalPages },
      });
    } catch (error: any) {
      toast.error(error.response);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const fetchUserByCedula = (page: number, cedula: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/users/cedula/${cedula}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch<FetchUsers>({
        type: types.FETCH_USERS_DATA,
        payload: { users: data.users, totalPages: data.totalPages },
      });
    } catch (error: any) {
      toast.error(error.response);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const clearSelectedUser = (): ClearSelectedUser => {
  return {
    type: types.CLEAR_SELECTED_USER,
    payload: undefined,
  };
};
