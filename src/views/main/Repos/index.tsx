import Table from '../../../components/table/Table';
import { useRepositories } from '../../../hooks/useRepositories';
import { REPO_TABLE_HEADERS } from '../../../utils/constants';
import ReposHeader from '../ReposHeader';
import ReposTable from '../ReposTable';
import ReposTablePagination from '../ReposTablePagination';
import ReposTableSkeleton from '../ReposTableSkeleton';

const Repos = () => {
  const [repos, { error, loading }, setSearchInput, pagination] =
    useRepositories();

  return (
    <>
      <ReposHeader searchHandler={setSearchInput} />

      {error && (
        <div>
          <p>Ooops! Something went wrong. Please try again later.</p>
        </div>
      )}

      {loading ? (
        <Table headers={REPO_TABLE_HEADERS}>
          <ReposTableSkeleton />
        </Table>
      ) : (
        <>
          <ReposTable headers={REPO_TABLE_HEADERS} repos={repos} />

          {repos.length !== 0 && <ReposTablePagination {...pagination} />}
        </>
      )}
    </>
  );
};

export default Repos;
