import { actions, reducers } from '../../repository';
import { asImmutable } from '../../../../utils';

describe('repository reducer tests', () => {
  const { initialState, reducer } = reducers;

  const someStateWithRepos = asImmutable({
    starredRepositories: asImmutable({
      'Y3Vyc29yOnYyOpHOB7IwPw==': {
        name: 'repo1Name',
        owner: 'repo1OwnerLogin',
        description: 'repo1Description',
        starredCount: 1234,
        starred: false,
      },
      'Y3Vyc29yOnYyOpHOB7IwPw=CV': {
        name: 'repo2Name',
        owner: 'repo2OwnerLogin',
        description: 'repo2Description',
        starredCount: 4321,
        starred: true,
      },
    }),
    nextCursor: null,
    beforeCursor: null,
    toast: '',
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEXT_CURSOR action', () => {
    const setNextCursorAction = {
      type: actions.SET_NEXT_CURSOR,
      payload: 'Y3Vyc29yOnYyOpHOB7IwPw==',
    };

    expect(reducer(initialState, setNextCursorAction)).toEqual(
      asImmutable({
        starredRepositories: asImmutable({}),
        nextCursor: 'Y3Vyc29yOnYyOpHOB7IwPw==',
        beforeCursor: null,
        toast: '',
      }),
    );
  });

  it('should handle SET_BEFORE_CURSOR action', () => {
    const setBeforeCursorAction = {
      type: actions.SET_BEFORE_CURSOR,
      payload: 'Y3Vyc29yOnYyOpHOB7IwPw==',
    };

    expect(reducer(initialState, setBeforeCursorAction)).toEqual(
      asImmutable({
        starredRepositories: asImmutable({}),
        nextCursor: null,
        beforeCursor: 'Y3Vyc29yOnYyOpHOB7IwPw==',
        toast: '',
      }),
    );
  });

  it('should handle CLEAR_TOAST action', () => {
    const setBeforeCursorAction = {
      type: actions.CLEAR_TOAST,
    };

    const exampleStateWithToast = asImmutable({
      starredRepositories: asImmutable({}),
      nextCursor: null,
      beforeCursor: null,
      toast: 'message',
    });

    expect(reducer(exampleStateWithToast, setBeforeCursorAction)).toEqual(
      asImmutable({
        starredRepositories: asImmutable({}),
        nextCursor: null,
        beforeCursor: null,
        toast: '',
      }),
    );
  });

  it('should handle SEARCH_REPOSITORIES.SUCCEEDED action', () => {
    const searchRepositoriesSucceededAction = {
      type: actions.SEARCH_REPOSITORIES.SUCCEEDED,
      payload: {
        'Y3Vyc29yOnYyOpHOB7IwPw==': {
          name: 'repo1Name',
          owner: 'repo1OwnerLogin',
          description: 'repo1Description',
          starredCount: 1234,
          starred: false,
        },
        'Y3Vyc29yOnYyOpHOB7IwPw=CV': {
          name: 'repo2Name',
          owner: 'repo2OwnerLogin',
          description: 'repo2Description',
          starredCount: 4321,
          starred: true,
        },
      },
    };

    expect(reducer(initialState, searchRepositoriesSucceededAction)).toEqual(
      asImmutable({
        starredRepositories: asImmutable({
          'Y3Vyc29yOnYyOpHOB7IwPw==': {
            name: 'repo1Name',
            owner: 'repo1OwnerLogin',
            description: 'repo1Description',
            starredCount: 1234,
            starred: false,
          },
          'Y3Vyc29yOnYyOpHOB7IwPw=CV': {
            name: 'repo2Name',
            owner: 'repo2OwnerLogin',
            description: 'repo2Description',
            starredCount: 4321,
            starred: true,
          },
        }),
        nextCursor: null,
        beforeCursor: null,
        toast: '',
      }),
    );
  });

  it('should handle STAR_REPOSITORY.SUCCEEDED action in a unstarred repo', () => {
    const starRepositorySucceededAction = {
      type: actions.STAR_REPOSITORY.SUCCEEDED,
      payload: {
        starredId: 'Y3Vyc29yOnYyOpHOB7IwPw==',
        isStarred: false,
      },
    };

    expect(reducer(someStateWithRepos, starRepositorySucceededAction)).toEqual(
      asImmutable({
        starredRepositories: asImmutable({
          'Y3Vyc29yOnYyOpHOB7IwPw==': {
            name: 'repo1Name',
            owner: 'repo1OwnerLogin',
            description: 'repo1Description',
            starredCount: 1234,
            starred: true,
          },
          'Y3Vyc29yOnYyOpHOB7IwPw=CV': {
            name: 'repo2Name',
            owner: 'repo2OwnerLogin',
            description: 'repo2Description',
            starredCount: 4321,
            starred: true,
          },
        }),
        nextCursor: null,
        beforeCursor: null,
        toast: 'starred',
      }),
    );
  });

  it('should handle STAR_REPOSITORY.SUCCEEDED action in a starred repo', () => {
    const starRepositorySucceededAction = {
      type: actions.STAR_REPOSITORY.SUCCEEDED,
      payload: {
        starredId: 'Y3Vyc29yOnYyOpHOB7IwPw=CV',
        isStarred: true,
      },
    };

    expect(reducer(someStateWithRepos, starRepositorySucceededAction)).toEqual(
      asImmutable({
        starredRepositories: asImmutable({
          'Y3Vyc29yOnYyOpHOB7IwPw==': {
            name: 'repo1Name',
            owner: 'repo1OwnerLogin',
            description: 'repo1Description',
            starredCount: 1234,
            starred: false,
          },
          'Y3Vyc29yOnYyOpHOB7IwPw=CV': {
            name: 'repo2Name',
            owner: 'repo2OwnerLogin',
            description: 'repo2Description',
            starredCount: 4321,
            starred: false,
          },
        }),
        nextCursor: null,
        beforeCursor: null,
        toast: 'unstarred',
      }),
    );
  });
});
