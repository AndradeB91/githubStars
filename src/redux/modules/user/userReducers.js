import { asImmutable } from '../../../utils';
import * as actions from './userActions';

export const initialState = asImmutable({
  loginToFetch: '',
  user: asImmutable({
    name: '',
    login: '',
    avatarUrl: '',
    bio: '',
    location: '',
    email: '',
    url: '',
  }),
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      return state.setIn(['loginToFetch'], asImmutable(action.payload));
    }
    case actions.SEARCH_USER.SUCCEEDED: {
      return state.setIn(['user'], asImmutable(action.payload));
    }
    case actions.SEARCH_USER.FAILED: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
