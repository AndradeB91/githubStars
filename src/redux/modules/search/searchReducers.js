import { asImmutable } from '../../../utils';
import * as actions from './searchActions';

const initialState = asImmutable({
  toast: '',
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
  starredRepositories: asImmutable({}),
  nextCursor: null,
  beforeCursor: null,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      return state
        .setIn(['loginToFetch'], asImmutable(action.payload))
        .setIn(['toast'], '');
    }
    case actions.SET_NEXT_CURSOR: {
      return state.setIn(['nextCursor'], action.payload).setIn(['toast'], '');
    }
    case actions.SET_BEFORE_CURSOR: {
      return state.setIn(['beforeCursor'], action.payload).setIn(['toast'], '');
    }
    case actions.SEARCH_USER.SUCCEEDED: {
      return !action.payload
        ? initialState
        : state
            .setIn(['user'], asImmutable(action.payload))
            .setIn(['toast'], '')
            .setIn(['starredRepositories'], asImmutable({}));
    }
    case actions.SEARCH_USER.FAILED: {
      return initialState;
    }
    case actions.SEARCH_REPOSITORIES.SUCCEEDED: {
      return state
        .setIn(['starredRepositories'], asImmutable(action.payload))
        .setIn(['toast'], '');
    }
    case actions.SEARCH_REPOSITORIES.FAILED: {
      return state.setIn(['toast'], 'failed');
    }
    case actions.STAR_REPOSITORY.SUCCEEDED: {
      const { starredId, isStarred } = action.payload;
      const message = isStarred ? 'unstarred' : 'starred';
      return state
        .mergeIn(['starredRepositories', starredId, 'starred'], !isStarred)
        .setIn(['toast'], message);
    }
    default:
      return state;
  }
};

export default reducer;
