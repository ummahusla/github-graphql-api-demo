import { useQuery, gql } from '@apollo/client';

const FILMS_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(FILMS_QUERY);

  if (loading) return <div>'Loading...'</div>;
  if (error)
    return (
      <div>
        <pre>{error.message}</pre>
      </div>
    );

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {data.launchesPast.map((launch: any) => (
          <li key={launch.id}>{launch.mission_name}</li>
        ))}
      </ul>
    </div>
  );
}
