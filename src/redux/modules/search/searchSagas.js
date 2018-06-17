import { all, take, takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { actions } from '../search';
import { graphqlClient } from '../../../api/graphql';
import { getUserLogin } from './searchSelectors';
import { 
	getUserInfosByLogin, 
	getUserStarredRepositoriesByLogin,
} from '../../../api/graphql/queries';

function* searchUser(action) {
	try {
		debugger;
		const { login } = action.payload;
		const query = getUserInfosByLogin(login);
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

function* searchRepositories(action) {
	try {
		const login = yield select(getUserLogin);
		const query = getUserStarredRepositoriesByLogin(login);
		const payload = yield call(graphqlClient.query, query);
		const { data: { user: { starredRepositories } } } = payload;
		const repos = starredRepositories.edges;

		let formattedRepos = [];

		repos.map(repo => {
			formattedRepos.push({
				owner: repo.node.owner.login,
				description: repo.node.description,
				starredCount: repo.node.stargazers.totalCount,
			})
		})

		yield put({
			type: actions.SEARCH_REPOSITORIES.SUCCEEDED,
			payload: formattedRepos,
		})
	} catch (err) {
		yield put({
			type: actions.SEARCH_REPOSITORIES.FAILED,
		})
    console.log(err);
  }
}

function* watchSearchUserRequested() {
  yield takeLatest(actions.SEARCH_USER.REQUESTED, searchUser)
}

function* watchSearchRepositoriesRequested() {
  yield takeLatest(actions.SEARCH_REPOSITORIES.REQUESTED, searchRepositories)
}

function* sagas() {
	yield all([
		watchSearchUserRequested(),
		watchSearchRepositoriesRequested(),
	])
}

export default sagas;
