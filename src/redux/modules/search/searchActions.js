import { buildActions } from '../../../utils';
import MODULE_NAME from './searchConstants';

export const SET_USER = `${MODULE_NAME}/SET_USER`;

export const SEARCH_USER = buildActions(MODULE_NAME, 'SEARCH_USER');

export const setUser = login => ({
  type: SET_USER,
  payload: {
    login,
  },
})

export const searchUser = name => ({
  type: SEARCH_USER.REQUESTED,
  payload: {
    name,
  },
});

export const searchUserSucceeded = data => ({
  type: SEARCH_USER.SUCCEEDED,
  payload: {
    data,
  },
});

export const signInWithEmailFailed = error => ({
  type: SEARCH_USER.FAILED,
  payload: {
    error,
  },
});

