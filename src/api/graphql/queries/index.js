import gql from 'graphql-tag'

export const getLoggedUserName = {
  query: gql`
  { 
    viewer { 
      login
    }
  }
`};

export const getUserInfosByLogin = (login) => ({
  query: gql`
  {
    user(login: ${login}) {
      name
      login
      avatarUrl
      bio
      location
      email
      url
      starredRepositories(first: 100) {
        edges {
          cursor
          node {
            stargazers{
              totalCount
            }
            id
            name
            primaryLanguage {
              id
              name
              color
            }
          }
        }
      }
    }
  }
`});