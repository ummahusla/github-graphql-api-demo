import { useQuery, gql } from '@apollo/client';

const REPOSITORY_LIST = gql`
  {
    viewer {
      repositories(
        ownerAffiliations: [OWNER]
        privacy: PUBLIC
        isFork: false
        isLocked: false
        first: 10
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        edges {
          node {
            id
            name
            url
            owner {
              login
            }
            description
            stargazers {
              totalCount
            }
            forkCount
          }
        }
      }
    }
  }
`;

export default function useRepositoryList() {
  return useQuery(REPOSITORY_LIST);
}
