import { all, takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { actions } from '../user';
import { graphqlClient } from '../../../api/graphql';

import { getUserInfosByLogin } from '../../../api/graphql/queries';

export function* searchUser(action) {
  try {
    const { login } = action.payload;
    const query = getUserInfosByLogin(login);
    const payload = yield call(graphqlClient.query, query);
    const { data: { user } } = payload;

    if (user) {
      yield put({
        type: actions.SEARCH_USER.SUCCEEDED,
        payload: user,
      });
    } else {
      yield put({
        type: actions.SEARCH_USER.FAILED,
      });
    }
  } catch (err) {
    yield put({
      type: actions.SEARCH_USER.FAILED,
    });
    console.log(err);
  }
  yield put(push('/profile'));
}

export function* watchSearchUserRequested() {
  yield takeLatest(actions.SEARCH_USER.REQUESTED, searchUser);
}

function* sagas() {
  yield all([watchSearchUserRequested()]);
}

export default sagas;
