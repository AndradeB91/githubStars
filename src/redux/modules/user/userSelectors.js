import { emptyMap } from '../../../utils';
import MODULE_NAME from './userConstants';

export const getAllUserInfos = state =>
  state.getIn([`${MODULE_NAME}`, 'user'], emptyMap);

export const getUserLoginToFetch = state =>
  state.getIn([`${MODULE_NAME}`, 'loginToFetch'], emptyMap);

export const getUserLogin = state =>
  state.getIn([`${MODULE_NAME}`, 'user', 'login'], emptyMap);
