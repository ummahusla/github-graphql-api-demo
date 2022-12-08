import { ApolloError } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { REPOS_PER_PAGE } from '../utils/constants';
import useRepositoryList from './useRepositoryList';

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

export function useRepositories(): [
  Repository[],
  {
    loading: boolean;
    error: ApolloError | undefined;
  },
  (searchInput: string) => void,
  {
    currentPage: number;
    numberOfPages: number;
    setCurrentPage: (currentPage: number) => void;
    recordsNumber: number;
  }
] {
  const { loading, error, data } = useRepositoryList();

  // Map the raw data to a more readable format
  const repos: Repository[] = useMemo(() => {
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

  const [searchInput, setSearchInput] = useState('');
  const searchInProgress = searchInput !== '';

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * REPOS_PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - REPOS_PER_PAGE;
  const [recordsNumber, setRecordsNumber] = useState(repos.length);

  const currentRepos = useMemo(
    () => repos.slice(indexOfFirstRecord, indexOfLastRecord),
    [indexOfFirstRecord, indexOfLastRecord, repos]
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
      searchInProgress
        ? filteredRepos.length / REPOS_PER_PAGE
        : repos.length / REPOS_PER_PAGE
    );
  }, [filteredRepos.length, repos.length, searchInProgress]);

  useEffect(() => {
    // Calculate the total number of results to display in pagination component
    if (searchInProgress) {
      setRecordsNumber(filteredRepos.length);
    } else {
      setRecordsNumber(repos.length);
    }
  }, [filteredRepos.length, repos.length, searchInProgress, setRecordsNumber]);

  return [
    filteredRepos,
    {
      loading,
      error,
    },
    setSearchInput,
    {
      currentPage,
      numberOfPages,
      setCurrentPage,
      recordsNumber,
    },
  ];
}
