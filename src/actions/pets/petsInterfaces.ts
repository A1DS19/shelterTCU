import { AuthPayload } from '../auth';
import { types } from '../types';

type PhotosPublicId = {
  photoUrl: string;
  photoId: string;
};

export interface PetsData {
  id?: number;
  _id?: string;
  name: string;
  location: string;
  breed: string;
  adopted: string;
  photosUrl?: string[];
  photosPublicId?: PhotosPublicId[];
  description: string;
  size?: 'pequeno' | 'grande';
  adoptionDate?: Date;
  adoptionPlace?: string;
  interesados?: number;
  adopteeId?: any;
  employee?: string;
  followUpDate?: Date;
  cedulaAdoptee?: string;
}

export interface UpdatePageNumber {
  type: types.UPDATE_PAGE_NUMBER;
  payload: number;
}

export interface PetsComments {
  id: String;
  date: Date;
  comment: String;
  commentReplies: [];
}

export interface FetchPets {
  type: types.FETCH_PETS_DATA;
  payload: { pets: PetsData[]; totalPages: number };
}

export interface FetchSelectedPet {
  type: types.FETCH_SELECTED_PET;
  payload: PetsData | undefined;
}

export interface ClearSelectedPet {
  type: types.CLEAR_SELECTED_PET;
  payload: undefined;
}

export interface CreatePet {
  type: types.CREATE_PET;
  payload: PetsData;
}

export interface UpdatePet {
  type: types.UPDATE_PET;
  payload: PetsData;
}

export interface DeletePet {
  type: types.DELETE_PET;
  payload: string | null;
}

export interface FecthUserWishlist {
  type: types.FETCH_USER_WISHLIST;
  payload: PetsData[] | undefined;
}
