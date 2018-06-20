import { buildActions } from '../../../utils';
import MODULE_NAME from './searchConstants';

export const SET_USER = `${MODULE_NAME}/SET_USER`;

export const SET_NEXT_CURSOR = `${MODULE_NAME}/SET_NEXT_CURSOR`;

export const SET_BEFORE_CURSOR = `${MODULE_NAME}/SET_BEFORE_CURSOR`;

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

export const setNextCursor = cursor => ({
  type: SET_NEXT_CURSOR,
  payload: cursor,
});

export const setBeforeCursor = cursor => ({
  type: SET_BEFORE_CURSOR,
  payload: cursor,
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

export const searchRepositories = pagination => ({
  type: SEARCH_REPOSITORIES.REQUESTED,
  payload: {
    pagination,
  },
});

export const searchRepositoriesSucceeded = data => ({
  type: SEARCH_REPOSITORIES.SUCCEEDED,
  payload: {
    data,
  },
});

export const searchRepositoriesFailed = error => ({
  type: SEARCH_REPOSITORIES.FAILED,
  payload: {
    error,
  },
});

export const starRepository = (id, isStarred) => ({
  type: STAR_REPOSITORY.REQUESTED,
  payload: {
    id,
    isStarred,
  },
});

export const starRepositorySuceeded = data => ({
  type: STAR_REPOSITORY.SUCCEEDED,
  payload: {
    data,
  },
});

export const starRepositoryFailed = error => ({
  type: STAR_REPOSITORY.FAILED,
  payload: {
    error,
  },
});
