import { all, take, takeLatest, call, put } from 'redux-saga/effects';
import { actions } from '../search';
import { getLoggedUserName } from '../../../api/graphql/queries';
import { graphqlClient } from '../../../api/graphql';

function* searchUser() {
	const query = getLoggedUserName;
	
	const result = yield call(graphqlClient.query, query);
	console.log(result);
}

function* watchSearchUserRequested() {
  yield takeLatest(actions.SEARCH_USER.REQUESTED, searchUser)
}

function* sagas() {
	yield all([
		watchSearchUserRequested(),
	])
}

export default sagas;
