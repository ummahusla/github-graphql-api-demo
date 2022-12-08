import { useState, useMemo } from 'react';

import { Repository } from './useRepositories';

export default function useReposPagination(repos: Repository[]): [
  Repository[],
  {
    recordsPerPage: number;
    setRecordsNumber: (recordsNumber: number) => void;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    recordsNumber: number;
  }
] {
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [recordsNumber, setRecordsNumber] = useState(repos.length);

  const currentRepos = useMemo(
    () => repos.slice(indexOfFirstRecord, indexOfLastRecord),
    [indexOfFirstRecord, indexOfLastRecord, repos]
  );

  return [
    currentRepos,
    {
      recordsPerPage,
      setRecordsNumber,
      currentPage,
      setCurrentPage,
      recordsNumber,
    },
  ];
}
