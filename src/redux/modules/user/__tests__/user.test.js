import { actions, reducers } from '../../user';
import { asImmutable } from '../../../../utils';

describe('user reducer tests', () => {
  const { initialState, reducer } = reducers;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_USER action', () => {
    const setUserAction = {
      type: actions.SET_USER,
      payload: 'login',
    };

    expect(reducer(initialState, setUserAction)).toEqual(
      asImmutable({
        loginToFetch: 'login',
        user: asImmutable({
          name: '',
          login: '',
          avatarUrl: '',
          bio: '',
          location: '',
          email: '',
          url: '',
        }),
      }),
    );
  });

  it('should handle SEARCH_USER.FAILED action', () => {
    const searchUserFailedAction = {
      type: actions.SEARCH_USER.FAILED,
      payload: null,
    };
    expect(reducer(initialState, searchUserFailedAction)).toEqual(initialState);
  });

  it('should handle SEARCH_USER.SUCCEEDED action', () => {
    const searchUserSucceededAction = {
      type: actions.SEARCH_USER.SUCCEEDED,
      payload: asImmutable({
        name: 'username',
        login: 'login',
        avatarUrl: 'http://www.avatarurl.com/login',
        bio: 'some user bio',
        location: 'location - NN',
        email: 'email@email.com',
        url: 'https://github.com/username',
      }),
    };
    expect(reducer(initialState, searchUserSucceededAction)).toEqual(
      asImmutable({
        loginToFetch: '',
        user: asImmutable({
          name: 'username',
          login: 'login',
          avatarUrl: 'http://www.avatarurl.com/login',
          bio: 'some user bio',
          location: 'location - NN',
          email: 'email@email.com',
          url: 'https://github.com/username',
        }),
      }),
    );
  });
});
