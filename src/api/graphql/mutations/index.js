import gql from 'graphql-tag';

export const addStarMutation = starrableId => ({
  mutation: gql`
    mutation {
      addStar(input: { starrableId: '${starrableId}' }) {
        starrable{
          id
        }
      }
    }
  `,
});
