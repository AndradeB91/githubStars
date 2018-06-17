import { asImmutable } from '../../../utils';
import * as actions from './searchActions';

const initialState = asImmutable({
  user: {
    name: '',
    login: '',
    avatarUrl: '',
    bio: '',
    location: '',
    email: '',
    url: '',
    starredRepositories: {},
  },
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      return state.mergeIn(['user'], asImmutable(action.payload));
    }
    case actions.SEARCH_USER.SUCCEEDED: {
      return state.mergeIn(['user'], asImmutable(action.payload));
    }
    case actions.SEARCH_REPOSITORIES.SUCCEEDED: {
      debugger;
      
      // return state.mergeIn(['user'], asImmutable(action.payload));
    }
    default:
      return state;
  }
};

export default reducer;
