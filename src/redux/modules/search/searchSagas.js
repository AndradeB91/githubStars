import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { actions } from '../search';
import { graphqlClient } from '../../../api/graphql';

import { getUserLogin, getUserStarredRepositories } from './searchSelectors';

import {
  getUserInfosByLogin,
  getUserStarredRepositoriesByLogin,
} from '../../../api/graphql/queries';

import {
  addStarMutation,
  removeStarMutation,
} from '../../../api/graphql/mutations';

function* searchUser(action) {
  try {
    const { login } = action.payload;
    const query = getUserInfosByLogin(login);
    const payload = yield call(graphqlClient.query, query);
    const { data: { user } } = payload;

    yield put({
      type: actions.SEARCH_USER.SUCCEEDED,
      payload: user,
    });
    yield put(push('/profile'));
  } catch (err) {
    yield put({
      type: actions.SEARCH_USER.FAILED,
    });
    console.log(err);
  }
}

function* searchRepositories(action) {
  try {
    const reposInState = yield select(getUserStarredRepositories);
    if (reposInState.size === 0) {
      const login = yield select(getUserLogin);
      const query = getUserStarredRepositoriesByLogin(login);
      const payload = yield call(graphqlClient.query, query);
      const { data: { user: { starredRepositories } } } = payload;
      const repos = starredRepositories.edges;
      let formattedRepos = {};

      repos.map(repo => {
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
    }
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
  } catch (err) {
    yield put({
      type: actions.STAR_REPOSITORY.FAILED,
    });
    console.log(err);
  }
}

function* watchSearchUserRequested() {
  yield takeLatest(actions.SEARCH_USER.REQUESTED, searchUser);
}

function* watchSearchRepositoriesRequested() {
  yield takeLatest(actions.SEARCH_REPOSITORIES.REQUESTED, searchRepositories);
}

function* watchStarRepositoryRequested() {
  yield takeLatest(actions.STAR_REPOSITORY.REQUESTED, starRepository);
}

function* sagas() {
  yield all([
    watchSearchUserRequested(),
    watchSearchRepositoriesRequested(),
    watchStarRepositoryRequested(),
  ]);
}

export default sagas;
