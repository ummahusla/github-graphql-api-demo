# GitHub GrahpQL API demo

Playing around with GitHub's GraphQL API for the demo purposes and the opportunity to have more practice with GraphQL and Apollo in general.

---

## Local development setup

1. # [Create a new personal token](https://github.com/settings/tokens) with the following scope:

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

---

## Available Scripts

In the project directory, you can run:

- `npm start` # http://localhost:3000
- `npm test`
- `yarn build`
