import { emptyMap } from '../../../utils';
import MODULE_NAME from './searchConstants';

export const getUserName = state => state.getIn([`${MODULE_NAME}`, 'user', 'name'], emptyMap);


