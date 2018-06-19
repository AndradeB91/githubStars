import { asImmutable } from '../../../utils';
import * as actions from './searchActions';

const initialState = asImmutable({
  toast: '',
  loginToFetch: '',
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
      state = state.setIn(['toast'], '');
      return state.mergeIn(['loginToFetch'], asImmutable(action.payload));
    }
    case actions.SEARCH_USER.SUCCEEDED: {
      state = state.setIn(['toast'], '');
      state = state.mergeIn(['user'], asImmutable(action.payload));
      return state.setIn(['user', 'starredRepositories'], asImmutable({}));
    }
    case actions.SEARCH_USER.FAILED: {
      return initialState;
    }
    case actions.SEARCH_REPOSITORIES.SUCCEEDED: {
      state = state.setIn(['toast'], '');
      return state.setIn(
        ['user', 'starredRepositories'],
        asImmutable(action.payload),
      );
    }
    case actions.SEARCH_REPOSITORIES.FAILED: {
      return state.setIn(['toast'], 'failed');
    }
    case actions.STAR_REPOSITORY.SUCCEEDED: {
      const { starredId, isStarred } = action.payload;
      const message = isStarred ? 'unstarred' : 'starred';
      state = state.setIn(['toast'], message);
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
