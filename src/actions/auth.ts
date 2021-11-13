import { asyncActionStart, asyncActionFinish } from './loading/loading';
import { Dispatch } from 'redux';
import { types } from './types';
import { api } from '../config/axios';
import { toast } from 'react-toastify';
import { closeModal } from './modals';
import { FecthUserWishlist } from './pets/petsInterfaces';

export interface AuthPayload {
  id?: number;
  _id?: any;
  email: string;
  password: string;
  name?: string;
  lastName?: string;
  isAdmin?: string;
  displayName?: string;
  createdAt?: Date;
  photoURL?: string;
  wishlist?: string[];
  direction?: string;
  cedula?: string;
  phone?: string;
  donation?: string;
}

export interface SignInAction {
  type: types.SIGNED_IN;
  payload: AuthPayload;
}

export interface SignOutAction {
  type: types.SIGNED_OUT;
}

export interface FetchCurrentUserAction {
  type: types.FETCH_CURRENT_USER;
  payload: AuthPayload;
}

export interface UpdateCurrentUserAction {
  type: types.UPDATE_CURRENT_USER;
  payload: AuthPayload;
}

export interface DeleteItemWishlist {
  type: types.REMOVE_ITEM_USER_WISHLIST;
  payload: string | null;
}

export const signInUser = (user: AuthPayload) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.post('/auth/login', user);
      dispatch<SignInAction>({ type: types.SIGNED_IN, payload: data.user });
      console.log(data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      dispatch(closeModal());
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const registerUser = (user: AuthPayload) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.post('/auth/register', user);
      dispatch<SignInAction>({ type: types.SIGNED_IN, payload: data.user });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      dispatch(closeModal());
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const fetchCurrentUser = (userId: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      data &&
        dispatch<FetchCurrentUserAction>({
          type: types.FETCH_CURRENT_USER,
          payload: data,
        });
    } catch (error: any) {
      throw error;
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const addFavorite = (userId: string | null, petId: string, exists: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.patch(
        `/users/add-favorite-pets/${userId}/${petId}/${exists}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch<FetchCurrentUserAction>({ type: types.FETCH_CURRENT_USER, payload: data });

      if (exists) {
        dispatch<DeleteItemWishlist>({
          type: types.REMOVE_ITEM_USER_WISHLIST,
          payload: petId,
        });
      }
    } catch (error: any) {
      throw error;
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const getFavorite = (userId: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/users/get-favorite-pets/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch<FecthUserWishlist>({
        type: types.FETCH_USER_WISHLIST,
        payload: data.wishlist,
      });
    } catch (error: any) {
      throw error;
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const updateCurrentUser = (
  userId: number | undefined,
  user: Partial<AuthPayload>
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.patch(`/users/${userId}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(data);

      dispatch<UpdateCurrentUserAction>({
        type: types.UPDATE_CURRENT_USER,
        payload: data,
      });
      toast.success('Datos actualizados');
    } catch (error: any) {
      error.response.data.message.forEach((msg: string) => {
        toast.error(msg);
      });
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const signOutUser = (): SignOutAction => {
  localStorage.clear();
  return { type: types.SIGNED_OUT };
};

export const updateUserPassword = (userId: string | null, password: Object) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.patch(`/users/reset-password/${userId}`, password, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success(data.msg);
    } catch (error: any) {
      error.response.data.message.forEach((msg: string) => {
        toast.error(msg);
      });
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const deleteUser = (userId: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Usuario eliminado');
      dispatch(signOutUser());
    } catch (err: any) {
      err.response.data.message.forEach((msg: string) => {
        toast.error(msg);
      });
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const updateUserPFP = (userId: string | null, image: File[], cb: () => void) => {
  const formData = new FormData();
  formData.append('image', image[0]);

  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.post(`/auth/user/upload/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch<UpdateCurrentUserAction>({
        type: types.UPDATE_CURRENT_USER,
        payload: data,
      });
      cb();
    } catch (err: any) {
      err.response.data.message.forEach((msg: string) => {
        toast.error(msg);
      });
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};
