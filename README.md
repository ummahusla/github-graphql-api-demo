# GitHub GrahpQL API demo

## Deployed version

- https://github-graphql-api-demo.netlify.app

---

Playing around with GitHub's GraphQL API for the demo purposes and the opportunity to have more practice with GraphQL and Apollo in general.

---

## Local development setup

1. [Create a new personal token](https://github.com/settings/tokens) with the following scope:

```
repo
read:packages
read:org
read:public_key
read:repo_hook
user
read:discussion
read:enterprise
read:gpg_key
```

2. Create `.env.local` file as on the example below. We will use custom environment variable which is availabe as a part of [`create-react-app`](https://create-react-app.dev/docs/adding-custom-environment-variables/).

```
REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=
```

3. Run `yarn start` and open http://localhost:3000.

---

## Available Scripts

In the project directory, you can run:

- `yarn start`
- `yarn test`
- `yarn build`

---

## Future improvements and conciderations

- Automate Apollo types generation through GraphQL Code Generator.
- CSS variables introduction for storing global like colours, etc.
- Implement server-side filtering and pagination to replace the current client-side approach, which has several limitations on performance and functionality.
- Restructure the `src/assets/icon` folder by introducing either the package with an icon set or creating an `Icon` wrapper component.
- Reconsider integration test implementation and replace `MockProvider` with actual `ApolloProvider` as this approach doesn't fit well with the `react-testing-library` principles. It also doesn't make for a streamlined testing experience (https://www.arahansen.com/testing-apollo-components-using-react-testing-library/).
