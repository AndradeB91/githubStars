import gql from 'graphql-tag'

export const getLoggedUserName = {
  query: gql`
  { 
    viewer { 
      login
    }
  }
`};