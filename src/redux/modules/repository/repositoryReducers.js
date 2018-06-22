import { asImmutable } from '../../../utils';
import * as actions from './repositoryActions';

export const initialState = asImmutable({
  starredRepositories: asImmutable({}),
  nextCursor: null,
  beforeCursor: null,
  toast: '',
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_REPOSITORIES.SUCCEEDED: {
      return state.setIn(['starredRepositories'], asImmutable(action.payload));
    }
    case actions.STAR_REPOSITORY.SUCCEEDED: {
      const { starredId, isStarred } = action.payload;
      const message = isStarred ? 'unstarred' : 'starred';
      return state
        .mergeIn(['starredRepositories', starredId, 'starred'], !isStarred)
        .setIn(['toast'], message);
    }
    case actions.SET_NEXT_CURSOR: {
      return state.setIn(['nextCursor'], action.payload);
    }
    case actions.SET_BEFORE_CURSOR: {
      return state.setIn(['beforeCursor'], action.payload);
    }
    case actions.CLEAR_TOAST: {
      return state.mergeIn(['toast'], '');
    }
    default:
      return state;
  }
};

export default reducer;
