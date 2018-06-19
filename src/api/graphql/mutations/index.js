import gql from 'graphql-tag';

export const addStarMutation = starrableId => ({
  mutation: gql`
    mutation {
      addStar(input: { starrableId: "${starrableId}" }) {
        starrable{
          id
        }
      }
    }
  `
});

export const removeStarMutation = starrableId => ({
  mutation: gql`
    mutation {
      removeStar(input: { starrableId: "${starrableId}" }) {
        starrable{
          id
        }
      }
    }
  `
});
