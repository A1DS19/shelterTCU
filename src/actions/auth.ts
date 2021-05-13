import { asyncActionStart, asyncActionFinish, asyncActionError } from './loading/loading';
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
      dispatch<SignInAction>({ type: types.SIGNED_IN, payload: data });
      console.log(data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
      dispatch(closeModal());
    } catch (error) {
      toast.error(error.response.data.msg);
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
      dispatch<SignInAction>({ type: types.SIGNED_IN, payload: data });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
      dispatch(closeModal());
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const fetchCurrentUser = (userId: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/auth/user/${userId}`);
      dispatch<FetchCurrentUserAction>({ type: types.FETCH_CURRENT_USER, payload: data });
    } catch (error) {
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
      const { data } = await api.put(
        `/auth/user/add-favorite/${userId}/${petId}/${exists}`
      );
      dispatch<FetchCurrentUserAction>({ type: types.FETCH_CURRENT_USER, payload: data });

      if (exists) {
        dispatch<DeleteItemWishlist>({
          type: types.REMOVE_ITEM_USER_WISHLIST,
          payload: petId,
        });
      }
    } catch (error) {
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
      const { data } = await api.get(`/auth/user/get-favorite/${userId}`);
      dispatch<FecthUserWishlist>({ type: types.FETCH_USER_WISHLIST, payload: data });
    } catch (error) {
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
      const { data } = await api.put(`/auth/user/${userId}`, user);

      dispatch<UpdateCurrentUserAction>({
        type: types.UPDATE_CURRENT_USER,
        payload: data,
      });
      toast.success('Datos actualizados');
    } catch (error) {
      toast.error(error.response.data.msg);
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
      const { data } = await api.put(`/auth/user-password/${userId}`, password);
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const deleteUser = (userId: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.delete(`/auth/user/${userId}`);
      toast.success(data.msg);
      signOutUser();
    } catch (err) {
      toast.error(err.response.data.msg);
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
    } catch (err) {
      toast.error(err.response.data.msg);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};
