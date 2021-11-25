import { toast } from 'react-toastify';
import { asyncActionStart, asyncActionFinish } from '../loading/loading';
import { Dispatch } from 'redux';
import {
  ClearSelectedPet,
  CreatePet,
  UpdatePet,
  FetchPets,
  FetchSelectedPet,
  PetsData,
  DeletePet,
  UpdatePageNumber,
} from './petsInterfaces';
import { types } from '../types';

//test api
import { api } from '../../config/axios';
import { StoreState } from '../../reducers';

export const fetchPets = (page: number, filtro?: 'disponible' | 'adoptado') => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/pets?page=${page}`);

      let filterData;
      switch (filtro) {
        case 'disponible':
          filterData = [...data.pets.filter((pet: PetsData) => pet.adopted === 'false')];
          return dispatch<FetchPets>({
            type: types.FETCH_PETS_DATA,
            payload: { pets: filterData, totalPages: data.totalPages },
          });

        case 'adoptado':
          filterData = [...data.pets.filter((pet: PetsData) => pet.adopted === 'true')];
          return dispatch<FetchPets>({
            type: types.FETCH_PETS_DATA,
            payload: { pets: filterData, totalPages: data.totalPages },
          });

        default:
          return dispatch<FetchPets>({
            type: types.FETCH_PETS_DATA,
            payload: { pets: data.pets, totalPages: data.totalPages },
          });
      }
    } catch (error: any) {
      toast.error(error.response.data.msg);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const fetchAdoptedPets = (page: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/pets/pet/adopted-pets?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return dispatch<FetchPets>({
        type: types.FETCH_PETS_DATA,
        payload: { pets: data.pets, totalPages: data.totalPages },
      });
    } catch (error: any) {
      toast.error(error.response.data.msg);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const fetchPetByName = (page: number, name: string, status: 'adopted' | 'all') => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/pets/pet/get-by-name/${name}?status=${status}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return dispatch<FetchPets>({
        type: types.FETCH_PETS_DATA,
        payload: { pets: data, totalPages: page },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const fetchSelectedPet = (pet: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.get(`/pets/id/${pet}`);
      dispatch<FetchSelectedPet>({ type: types.FETCH_SELECTED_PET, payload: data });
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const createPet = (pet: PetsData, cb: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.post('/pets', pet, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch<CreatePet>({ type: types.CREATE_PET, payload: data });
      toast.success('Mascota creada');
      cb();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const updatePet = (petId: string, pet: PetsData, cb: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.patch(`/pets/${petId}`, pet, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch<UpdatePet>({ type: types.UPDATE_PET, payload: data });
      toast.success('Mascota actualizada');
      cb();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const updateFollowUpDate = (petId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      const { data } = await api.patch(`/pets/pet/update-followUpDate/${petId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch<UpdatePet>({ type: types.UPDATE_PET, payload: data });
      toast.success('Mascota actualizada');
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const deletePet = (id: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(asyncActionStart());
      await api.delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch<DeletePet>({ type: types.DELETE_PET, payload: id });
      toast.success('Mascota eliminada');
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const clearSelectedPet = (): ClearSelectedPet => {
  return {
    type: types.CLEAR_SELECTED_PET,
    payload: undefined,
  };
};

export const updatePageNumber = (page: number) => {
  return (dispatch: Dispatch, getState: () => StoreState) => {
    //let { page } = getState().pets;
    dispatch<UpdatePageNumber>({ type: types.UPDATE_PAGE_NUMBER, payload: page });
  };
};

export const addPetsPictures = (petId: string, images: any[], cb: () => void) => {
  return async (dispatch: Dispatch) => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    // formData.append('images[]', images[0]);
    // formData.append('images[]', images[1]);
    // formData.append('images[]', images[2]);

    try {
      dispatch(asyncActionStart());
      const { data } = await api.post(`/pets/upload/${petId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch<UpdatePet>({
        type: types.UPDATE_PET,
        payload: data,
      });
      toast.success(`${images.length >= 1 ? 'Images agregadas' : 'Imagen agregada'} `);
      cb();
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const deleteImg = (petId: string, photoId: string, photoUrl: string) => {
  return async (dispatch: Dispatch) => {
    const body = {
      petId,
      photoId,
      photoUrl,
    };
    try {
      dispatch(asyncActionStart());
      const { data } = await api.post(`/pets/delete-img`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(data);

      toast.success(data.msg);
      dispatch<FetchSelectedPet>({ type: types.FETCH_SELECTED_PET, payload: data.pet });
    } catch (error: any) {
      toast.error(error.response.data.msg);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};

export const sendEmail = (petId: any, emailData: Object) => {
  return async (dispatch: Dispatch) => {
    let newEmailData = {};
    newEmailData = { ...emailData, petId };

    try {
      dispatch(asyncActionStart());
      const { data } = await api.post(`/adoptions/send`, newEmailData);
      toast.success(data.msg);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    } finally {
      dispatch(asyncActionFinish());
    }
  };
};
