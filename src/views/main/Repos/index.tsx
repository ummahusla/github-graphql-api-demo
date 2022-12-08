import Table from '../../../components/table/Table';
import useReposPagination from '../../../hooks/useReposPagination';
import { useRepositories } from '../../../hooks/useRepositories';
import ReposHeader from '../ReposHeader';
import ReposTable from '../ReposTable';
import ReposTablePagination from '../ReposTablePagination';
import ReposTableSkeleton from '../ReposTableSkeleton';
import useFilteredRepos from '../../../hooks/useFilteredRepos';

const Repos = () => {
  const [repos, { loading, error }] = useRepositories();
  const [
    currentRepos,
    {
      recordsPerPage,
      setRecordsNumber,
      currentPage,
      setCurrentPage,
      recordsNumber,
    },
  ] = useReposPagination(repos);
  const [filteredRepos, { setSearchInput, numberOfPages }] = useFilteredRepos(
    repos,
    currentRepos,
    recordsPerPage,
    setRecordsNumber
  );

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
