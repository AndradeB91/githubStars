import { asImmutable } from '../../../utils';
import * as actions from './searchActions';

const initialState = asImmutable({
  user: {
    name: '',
  },
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      return state.mergeIn(['user'], asImmutable(action.payload));
    }
    case actions.SEARCH_USER.REQUESTED: {
      debugger;
    }
    default:
      return state;
  }
};

export default reducer;