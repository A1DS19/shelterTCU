import { PetsData } from './../actions/pets/petsInterfaces';
import { UsersAction } from './../actions/types';
import { AuthPayload } from './../actions/auth';
import { types } from '../actions/types';

export interface UsersInitialStateProps {
  usersData: AuthPayload[] | [];
  selectedUser: AuthPayload | undefined;
  wishlist: PetsData[] | undefined;
  page: number;
  totalPages: number;
}

const initialState: UsersInitialStateProps = {
  usersData: [],
  selectedUser: undefined,
  wishlist: [],
  page: 0,
  totalPages: 0,
};

export const usersReducer = (
  state: UsersInitialStateProps = initialState,
  action: UsersAction
) => {
  switch (action.type) {
    case types.FETCH_USERS_DATA:
      return {
        ...state,
        usersData: action.payload.users,
        totalPages: action.payload.totalPages,
      };

    case types.FETCH_SELECTED_USER:
      return { ...state, selectedUser: action.payload };

    case types.CREATE_USER:
      return { ...state, usersData: [...state.usersData, action.payload] };

    case types.UPDATE_USER:
      return {
        ...state,
        usersData: [
          ...state.usersData.filter(
            (user: AuthPayload) => user._id !== action.payload.id
          ),
          action.payload,
        ],
      };

    case types.DELETE_USER:
      return {
        ...state,
        usersData: state.usersData.filter(
          (user: AuthPayload) => user._id !== action.payload
        ),
      };

    case types.FETCH_USER_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    case types.CLEAR_SELECTED_USER:
      return { ...state, selectedUser: action.payload };

    case types.REMOVE_ITEM_USER_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist?.filter(
          (pet: PetsData) => pet._id !== action.payload?.toString()
        ),
      };

    default:
      return state;
  }
};
