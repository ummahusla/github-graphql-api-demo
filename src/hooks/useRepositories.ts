import { ApolloError } from '@apollo/client';
import { useMemo } from 'react';
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
  { loading: boolean; error: ApolloError | undefined }
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

  return [
    repos || [],
    {
      loading,
      error,
    },
  ];
}
