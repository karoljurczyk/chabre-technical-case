# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

# Extra Notes

1. I would definetely like to add pagination, filters and search query using router query params (it could use either native `/travels?page=3&filter[name]=john` or slugs `/travels/page/3/filter-name/john`), but it would need a proper database instead of current mocks in API endpoints, preferably with some nice query builder running underneath

2. Usually when translating custom designs I would use atomic structure in components folder (`/atoms, /molecules, /organisms`), but with Nuxt UI doing all the ground work there was no need for it, so I just created separate business/ui logic with `/ui` folder

3. Tests, tests, tests :)
