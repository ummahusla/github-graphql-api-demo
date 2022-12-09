import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Repos from '.';
import { REPOSITORY_LIST } from '../../../hooks/useRepositoryList';

const mocks = [
  {
    request: {
      query: REPOSITORY_LIST,
    },
    result: {
      data: {
        viewer: {
          repositories: {
            edges: [
              {
                node: {
                  id: 'MDEwOlJlcG9zaXRvcnkxMzM2MTI1NA==',
                  name: 'Codecademy-Exercise-Answers',
                  url:
                    'https://github.com/ummahusla/Codecademy-Exercise-Answers',
                  owner: {
                    login: 'ummahusla',
                  },
                  description: ':mortar_board: Codecademy.com exercise answers',
                  stargazers: {
                    totalCount: 291,
                  },
                  forkCount: 345,
                },
              },
              {
                node: {
                  id: 'MDEwOlJlcG9zaXRvcnkxMzUwODg2Mg==',
                  name: 'HTML5-Game-Development',
                  url: 'https://github.com/ummahusla/HTML5-Game-Development',
                  owner: {
                    login: 'ummahusla',
                  },
                  description:
                    ':video_game: Useful links for HTML5 game development',
                  stargazers: {
                    totalCount: 92,
                  },
                  forkCount: 25,
                },
              },
              {
                node: {
                  id: 'MDEwOlJlcG9zaXRvcnk3MDA4Njk1Mg==',
                  name: 'PotatoCSS',
                  url: 'https://github.com/ummahusla/PotatoCSS',
                  owner: {
                    login: 'ummahusla',
                  },
                  description:
                    '🥔 Simple CSS framework for hackers. Simple as potato.',
                  stargazers: {
                    totalCount: 52,
                  },
                  forkCount: 19,
                },
              },
            ],
          },
        },
      },
    },
  },
];

it('should render without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Repos />
    </MockedProvider>
  );
  expect(
    await screen.findByText(
      'Below is a list of the public repositories I have worked on over the years. Source code found there can give you nightmares, so look at your own risk.'
    )
  ).toBeInTheDocument();
  expect(
    await screen.findByText('Codecademy-Exercise-Answers')
  ).toBeInTheDocument();
  expect(await screen.findByText('HTML5-Game-Development')).toBeInTheDocument();
  expect(await screen.findByText('PotatoCSS')).toBeInTheDocument();
});

test('should render filtered results', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Repos />
    </MockedProvider>
  );

  const searchInput: HTMLInputElement = screen.getByPlaceholderText(
    'Search by name or description'
  );
  expect(searchInput.value).toBe('');

  fireEvent.change(searchInput, { target: { value: 'Codecademy' } });
  expect(searchInput.value).toBe('Codecademy');

  expect(
    await screen.findByText('Codecademy-Exercise-Answers')
  ).toBeInTheDocument();
  expect(screen.queryByText('HTML5-Game-Development')).not.toBeInTheDocument();
  expect(screen.queryByText('PotatoCSS')).not.toBeInTheDocument();
});

it('should render to the correct link', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Repos />
    </MockedProvider>
  );

  expect(
    await screen.findByText('Codecademy-Exercise-Answers')
  ).toHaveAttribute(
    'href',
    'https://github.com/ummahusla/Codecademy-Exercise-Answers'
  );
});

it('should show error message', async () => {
  const errorMock = [
    {
      request: {
        query: REPOSITORY_LIST,
      },
      error: new Error('An error occurred'),
    },
  ];

  render(
    <MockedProvider mocks={errorMock} addTypename={false}>
      <Repos />
    </MockedProvider>
  );
  expect(
    await screen.findByText(
      'Ooops! Something went wrong. Please try again later.'
    )
  ).toBeInTheDocument();
});
