import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { actions } from '../repository';
import { graphqlClient } from '../../../api/graphql';

import { getNextCursor, getBeforeCursor } from './repositorySelectors';

import { getUserLogin } from '../user/userSelectors';

import {
  getUserStarredRepositoriesByLogin,
  getUserStarredRepositoriesByLoginWithCursor,
} from '../../../api/graphql/queries';

import {
  addStarMutation,
  removeStarMutation,
} from '../../../api/graphql/mutations';

function* searchRepositories(action) {
  try {
    const login = yield select(getUserLogin);
    const nextCursor = yield select(getNextCursor);
    const beforeCursor = yield select(getBeforeCursor);
    const { pagination } = action.payload;

    const direction =
      pagination === 'next' ? 'after' : pagination === 'back' ? 'before' : null;

    const subSet =
      pagination === 'next' ? 'first' : pagination === 'back' ? 'last' : null;

    const cursor =
      pagination === 'next'
        ? nextCursor
        : pagination === 'back'
          ? beforeCursor
          : null;

    const query = cursor
      ? getUserStarredRepositoriesByLoginWithCursor(
          login,
          cursor,
          direction,
          subSet,
        )
      : getUserStarredRepositoriesByLogin(login);

    const payload = yield call(graphqlClient.query, query);
    const {
      data: {
        user: { starredRepositories },
      },
    } = payload;
    const repos = starredRepositories.edges;
    const actualNextCursor = repos.length
      ? repos[repos.length - 1].cursor
      : null;
    const actualBeforeCursor = repos.length ? repos[0].cursor : null;
    let formattedRepos = {};

    repos.forEach(repo => {
      const { id } = repo.node;
      formattedRepos[id] = {
        name: repo.node.name,
        owner: repo.node.owner.login,
        description: repo.node.description,
        starredCount: repo.node.stargazers.totalCount,
        starred: false,
      };
    });

    yield put({
      type: actions.SEARCH_REPOSITORIES.SUCCEEDED,
      payload: formattedRepos,
    });

    yield put({
      type: actions.SET_NEXT_CURSOR,
      payload: actualNextCursor,
    });

    yield put({
      type: actions.SET_BEFORE_CURSOR,
      payload: actualBeforeCursor,
    });
  } catch (err) {
    yield put({
      type: actions.SEARCH_REPOSITORIES.FAILED,
    });
    console.log(err);
  }
}

function* starRepository(action) {
  try {
    const { id, isStarred } = action.payload;
    const mutation = isStarred ? removeStarMutation(id) : addStarMutation(id);
    const payload = yield call(graphqlClient.mutate, mutation);
    const { data } = payload;
    const starredId = isStarred
      ? data.removeStar.starrable.id
      : data.addStar.starrable.id;
    yield put({
      type: actions.STAR_REPOSITORY.SUCCEEDED,
      payload: {
        starredId,
        isStarred,
      },
    });

    yield put({ type: actions.CLEAR_TOAST });
  } catch (err) {
    yield put({
      type: actions.STAR_REPOSITORY.FAILED,
    });
    console.log(err);
  }
}

function* watchSearchRepositoriesRequested() {
  yield takeLatest(actions.SEARCH_REPOSITORIES.REQUESTED, searchRepositories);
}

function* watchStarRepositoryRequested() {
  yield takeLatest(actions.STAR_REPOSITORY.REQUESTED, starRepository);
}

function* sagas() {
  yield all([
    watchSearchRepositoriesRequested(),
    watchStarRepositoryRequested(),
  ]);
}

export default sagas;
