import { all, take, takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { actions } from '../search';
import { graphqlClient } from '../../../api/graphql';
import { 
	getLoggedUserName, 
	getUserInfosByLogin 
} from '../../../api/graphql/queries';

function* searchUser(action) {
	try {
		const { name } = action.payload;
		const query = getUserInfosByLogin(name);
		const payload = yield call(graphqlClient.query, query);
		const { data: { user } } = payload;
		
		yield put({
			type: actions.SEARCH_USER.SUCCEEDED,
			payload: user,
		})
		yield put(push('/profile'));
	} catch (err) {
		yield put({
			type: actions.SEARCH_USER.FAILED,
		})
    console.log(err);
  }
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
