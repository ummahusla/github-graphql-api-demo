import { useQuery, gql } from '@apollo/client';

const GET_PERSONAL_REPOSITORIES = gql`
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

export default function App() {
  const { data, loading, error } = useQuery(GET_PERSONAL_REPOSITORIES);

  if (loading) return <div>'Loading...'</div>;
  if (error)
    return (
      <div>
        <pre>{error.message}</pre>
      </div>
    );

  const mappedRepositories = data.viewer.repositories.edges.map(
    (repository: any) => {
      const { id, name, url, owner, description, stargazers, forkCount } =
        repository.node;

      return {
        id,
        name,
        url,
        owner,
        description,
        stargazers,
        forkCount,
      };
    }
  );

  console.log(mappedRepositories);

  return (
    <div>
      <h1>List of my GitHub's repositories</h1>
      <ul>
        {mappedRepositories.map((repository: any) => (
          <li key={repository.id}>
            <a href={repository.url} target="_blank" rel="noreferrer">
              {repository.name}
            </a>
            <p>{repository.description}</p>
            <p>Stars: {repository.stargazers.totalCount}</p>
            <p>Forks: {repository.forkCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
