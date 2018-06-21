import { buildActions } from '../../../utils';
import MODULE_NAME from './userConstants';

export const SET_USER = `${MODULE_NAME}/SET_USER`;

export const SEARCH_USER = buildActions(MODULE_NAME, 'SEARCH_USER');

export const SEARCH_REPOSITORIES = buildActions(
  MODULE_NAME,
  'SEARCH_REPOSITORIES',
);

export const STAR_REPOSITORY = buildActions(MODULE_NAME, 'STAR_REPOSITORY');

export const setUser = login => ({
  type: SET_USER,
  payload: login,
});

export const searchUser = login => ({
  type: SEARCH_USER.REQUESTED,
  payload: {
    login,
  },
});

export const searchUserSucceeded = data => ({
  type: SEARCH_USER.SUCCEEDED,
  payload: {
    data,
  },
});

export const searchUserFailed = error => ({
  type: SEARCH_USER.FAILED,
  payload: {
    error,
  },
});
