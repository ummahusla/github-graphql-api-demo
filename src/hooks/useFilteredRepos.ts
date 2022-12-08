import { useState, useMemo, useEffect } from 'react';

import { Repository } from './useRepositories';

export default function useFilteredRepos(
  repos: Repository[],
  currentRepos: Repository[],
  recordsPerPage: number,
  setRecordsNumber: (recordsNumber: number) => void
): [
  Repository[],
  { setSearchInput: (searchInput: string) => void; numberOfPages: number }
] {
  const [searchInput, setSearchInput] = useState('');
  const searchInProgress = searchInput !== '';

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
      searchInProgress
        ? filteredRepos.length / recordsPerPage
        : repos.length / recordsPerPage
    );
  }, [filteredRepos.length, recordsPerPage, repos.length, searchInProgress]);

  useEffect(() => {
    // Calculate the total number of results to display in pagination component
    if (searchInProgress) {
      setRecordsNumber(filteredRepos.length);
    } else {
      setRecordsNumber(repos.length);
    }
  }, [filteredRepos.length, repos.length, searchInProgress, setRecordsNumber]);

  return [filteredRepos, { setSearchInput, numberOfPages }];
}
