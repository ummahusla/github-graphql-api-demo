# GitHub GrahpQL API demo

## Deployed version

- https://github-graphql-api-demo.netlify.app

---

Playing around with GitHub's GraphQL API for the demo purposes and the opportunity to have more practice with GraphQL and Apollo in general.

---

## Local development setup

1. [Create a new personal token](https://github.com/settings/tokens) with the following scope:

```bash
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

```bash
REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=
```

3. Next step can be either 3.1 or 3.2.
   3.1 Run `yarn && yarn start`.
   3.2 Run it via Docker.

```bash
docker build -t github-graphql-api .
docker run -p 3000:3000 github-graphql-api
docker-compose up
```

Browse to http://localhost:3000 to see an amazing piece of software which I've built.

---

## Production

To run a production build is available via `yarn build`.

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
- Finish dockerizing the production application, as only the local development version currently works. (https://rsbh.dev/blogs/dockerize-react-app).
