import { useMemo, useState } from 'react';

import Table from '../../../components/table/Table';
import useRepositoryList from '../../../hooks/useRepositoryList';
import ReposHeader from '../ReposHeader';
import ReposTable from '../ReposTable';
import ReposTablePagination from '../ReposTablePagination';
import ReposTableSkeleton from '../ReposTableSkeleton';

interface RawRepo {
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

export interface Repository {
  id: string;
  name: string;
  url: string;
  description: string;
  stargazers: {
    totalCount: number;
  };
  forkCount: number;
}

const Repos = () => {
  const { loading, error, data } = useRepositoryList();

  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Map the raw data to a more readable format
  const mappedRepos = useMemo(() => {
    if (!data) return [];

    return data.viewer.repositories.edges.map((repository: RawRepo) => {
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

  const numberOfPages = Math.ceil(mappedRepos.length / recordsPerPage);

  // Get the current's page repositories to display
  const currentRepos = useMemo(
    () => mappedRepos.slice(indexOfFirstRecord, indexOfLastRecord),
    [indexOfFirstRecord, indexOfLastRecord, mappedRepos]
  );

  // Filter the repositories based on the search input
  const filteredRepos = useMemo(() => {
    if (!searchInput) return currentRepos;

    return currentRepos.filter((repo: Repository) => {
      return repo.name.toLowerCase().includes(searchInput.toLowerCase());
    });
  }, [searchInput, currentRepos]);

  const tableHeaders = ['Name', 'Description', 'Stars', 'Forks'];

  return (
    <>
      <ReposHeader searchHandler={setSearchInput} />

      {error && (
        <div>
          <p>Ooops! Something went wrong. Please try again later.</p>
        </div>
      )}

      {loading ? (
        <Table headers={tableHeaders}>
          <ReposTableSkeleton />
        </Table>
      ) : (
        <>
          <ReposTable headers={tableHeaders} repos={filteredRepos} />

          <ReposTablePagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default Repos;
