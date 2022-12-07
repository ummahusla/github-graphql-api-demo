import { useMemo } from 'react';

import ExternalIcon from '../../../assets/icons/ExternalIcon';
import Table, { TableRow, TableData } from '../../../components/table/Table';
import useRepositoryList from '../../../hooks/useRepositoryList';

interface Repository {
  id: string;
  name: string;
  url: string;
  description: string;
  stargazers: {
    totalCount: number;
  };
  forkCount: number;
}

const Repositories = () => {
  const { loading, error, data } = useRepositoryList();

  const mappedRepositories = useMemo(() => {
    if (!data) return [];

    return data.viewer.repositories.edges.map((repository: any) => {
      const { id, name, url, description, stargazers, forkCount } =
        repository.node;

      return {
        id,
        name,
        url,
        description,
        stargazers,
        forkCount,
      };
    });
  }, [data]);

  if (loading) return <div>'Loading...'</div>;

  if (error) {
    return (
      <div>
        <pre>{error.message}</pre>
      </div>
    );
  }

  console.log(mappedRepositories);

  const tableHeaders = ['Name', 'Description', 'Stars', 'Forks'];

  return (
    <Table headers={tableHeaders}>
      {mappedRepositories.map((repository: Repository) => (
        <TableRow>
          <TableData>
            <a href={repository.url} target="_blank" rel="noreferrer">
              {repository.name} <ExternalIcon />
            </a>
          </TableData>
          <TableData>{repository.description}</TableData>
          <TableData>{repository.stargazers.totalCount}</TableData>
          <TableData>{repository.forkCount}</TableData>
        </TableRow>
      ))}
    </Table>
  );
};

export default Repositories;
