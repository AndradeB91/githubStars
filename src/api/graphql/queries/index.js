import gql from 'graphql-tag';

export const getLoggedUserName = {
  query: gql`
    {
      viewer {
        login
      }
    }
  `,
};

export const getUserInfosByLogin = login => ({
  query: gql`{
    user(login: ${login}) {
      name
      login
      avatarUrl
      bio
      location
      email
      url
    }
  }`,
});

export const getUserStarredRepositoriesByLogin = login => ({
  query: gql`{
    user(login: ${login}) {
      starredRepositories(first: 4) {
        edges {
          cursor
          node {
            id
            name
            description
            stargazers{
              totalCount
            }
            owner {
              id
              login
            }
          }
        }
      }
    }
  }`,
});

export const getUserStarredRepositoriesByLoginWithCursor = (
  login,
  cursor,
  direction,
  subSet,
) => ({
  query: gql`{
    user(login: ${login}) {
      starredRepositories(${subSet}: 4, ${direction}: "${cursor}") {
        edges {
          cursor
          node {
            id
            name
            description
            stargazers{
              totalCount
            }
            owner {
              id
              login
            }
          }
        }
      }
    }
  }`,
});
