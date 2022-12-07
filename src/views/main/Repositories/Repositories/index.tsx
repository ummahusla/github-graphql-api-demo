import { useMemo } from 'react';
import styled from 'styled-components';

import ExternalIcon from '../../../../assets/icons/ExternalIcon';
import Table, { TableRow, TableData } from '../../../../components/table/Table';
import useRepositoryList from '../../../../hooks/useRepositoryList';
import TableSkeleton from '../TableSkeleton';

interface RawRepository {
  node: {
    description: string;
    forkCount: number;
    id: string;
    name: string;
    owner: {
      login: string;
    };
    stargazers: {
      totalCount: number;
    };
    url: string;
  };
}

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

const ExternalLink = styled.a`
  display: flex;
  align-items: center;

  svg {
    margin-left: 5px;
  }
`;

const Repositories = () => {
  const { loading, error, data } = useRepositoryList();

  const mappedRepositories = useMemo(() => {
    if (!data) return [];

    return data.viewer.repositories.edges.map((repository: RawRepository) => {
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

  const tableHeaders = ['Name', 'Description', 'Stars', 'Forks'];

  if (loading) {
    return (
      <Table headers={tableHeaders}>
        <TableSkeleton />
      </Table>
    );
  }

  if (error) {
    return (
      <div>
        <pre>Ooops! {error.message}</pre>
      </div>
    );
  }

  return (
    <Table headers={tableHeaders}>
      {mappedRepositories.map((repository: Repository) => (
        <TableRow key={repository.id}>
          <TableData>
            <ExternalLink
              href={repository.url}
              target="_blank"
              rel="noreferrer"
            >
              {repository.name} <ExternalIcon />
            </ExternalLink>
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
