import { useEffect, useMemo, useState } from 'react';

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

  const recordsPerPage = 10;
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [recordsNumber, setRecordsNumber] = useState(mappedRepos.length);

  const currentRepos = useMemo(
    () => mappedRepos.slice(indexOfFirstRecord, indexOfLastRecord),
    [indexOfFirstRecord, indexOfLastRecord, mappedRepos]
  );

  // Filter the repositories based on the search input
  const filteredRepos = useMemo(() => {
    if (!searchInput) return currentRepos;

    return currentRepos.filter((repo: Repository) => {
      // If the repository doesn't have a description, filter by name only
      if (!repo.description)
        return repo.name.toLowerCase().includes(searchInput.toLowerCase());

      // If the repository has a description, filter by name and description
      return (
        repo.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  }, [searchInput, currentRepos]);

  // Calculate the total number of pages to display in pagination component
  const numberOfPages = useMemo(() => {
    return Math.ceil(
      searchInput !== ''
        ? filteredRepos.length / recordsPerPage
        : mappedRepos.length / recordsPerPage
    );
  }, [filteredRepos.length, mappedRepos.length, recordsPerPage, searchInput]);

  const tableHeaders = ['Name', 'Description', 'Stars', 'Forks'];

  useEffect(() => {
    // Calculate the total number of results to display in pagination component
    if (searchInput !== '') {
      setRecordsNumber(filteredRepos.length);
    } else {
      setRecordsNumber(mappedRepos.length);
    }
  }, [filteredRepos.length, mappedRepos.length, searchInput]);

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

          {filteredRepos.length !== 0 && (
            <ReposTablePagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              setCurrentPage={setCurrentPage}
              recordsNumber={recordsNumber}
            />
          )}
        </>
      )}
    </>
  );
};

export default Repos;
