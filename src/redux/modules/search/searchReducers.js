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
    starredRepositories: asImmutable({}),
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
      return state.mergeIn(
        ['user', 'starredRepositories'],
        asImmutable(action.payload),
      );
    }
    case actions.STAR_REPOSITORY.SUCCEEDED: {
      const { starredId, isStarred } = action.payload;
      state = state.mergeIn(
        ['user', 'starredRepositories', starredId, 'starred'],
        !isStarred,
      );
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
