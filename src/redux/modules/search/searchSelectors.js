import { emptyMap } from '../../../utils';
import MODULE_NAME from './searchConstants';

export const getAllUserInfos = state =>
  state.getIn([`${MODULE_NAME}`, 'user'], emptyMap);

export const getUserLoginToFetch = state =>
  state.getIn([`${MODULE_NAME}`, 'loginToFetch'], emptyMap);

export const getUserLogin = state =>
  state.getIn([`${MODULE_NAME}`, 'user', 'login'], emptyMap);

export const getToastMessage = state =>
  state.getIn([`${MODULE_NAME}`, 'toast'], emptyMap);

export const getUserStarredRepositories = state =>
  state.getIn([`${MODULE_NAME}`, 'starredRepositories'], emptyMap);

export const getNextCursor = state =>
  state.getIn([`${MODULE_NAME}`, 'nextCursor'], emptyMap);

export const getBeforeCursor = state =>
  state.getIn([`${MODULE_NAME}`, 'beforeCursor'], emptyMap);
