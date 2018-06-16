import { emptyMap } from '../../../utils';
import MODULE_NAME from './searchConstants';

export const getUserLogin = state => (
	state.getIn([`${MODULE_NAME}`, 'user', 'login'], emptyMap)
);

export const getAllUserInfos = state => (
	state.getIn([`${MODULE_NAME}`, 'user'], emptyMap)
)


