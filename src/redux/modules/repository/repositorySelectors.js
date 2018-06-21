import { emptyMap } from '../../../utils';
import MODULE_NAME from './repositoryConstants';

export const getUserStarredRepositories = state =>
  state.getIn([`${MODULE_NAME}`, 'starredRepositories'], emptyMap);

export const getNextCursor = state =>
  state.getIn([`${MODULE_NAME}`, 'nextCursor'], emptyMap);

export const getBeforeCursor = state =>
  state.getIn([`${MODULE_NAME}`, 'beforeCursor'], emptyMap);

export const getToastMessage = state =>
  state.getIn([`${MODULE_NAME}`, 'toast'], emptyMap);
