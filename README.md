# Ervell

Front-end Are.na client, built using Artsy's [Ezel](https://github.com/artsy/ezel). Also, made possible by Artsy's very generous decision to open source their front-end client. Many patterns (also bits of code, probably) adopted from [Force](https://github.com/artsy/force-public). Thanks y'all.

The general idea here is something minimal, utilitarian, unobtrusive and adaptible to many different situations. We try to make use of re-usable components and views as often as possible.

---

### Getting Started (Local)

- Fork this repo
- Obtain a set of `.env` files (`.env`, `.env.staging`, `.env.prod`) from [@dzucconi](https://github.com/dzucconi) or [@broskoski](https://github.com/broskoski)
- Install [Yarn](http://brewformulas.org/Yarn)
- Install dependencies: `yarn install`

### Running the server

```bash
  yarn start-dev

  # Or
  yarn start-staging
  yarn start-prod

  # => Listening on port 5000
```

---

## Deploying (Production)

URL: [www.are.na](https://www.are.na)

- Create a new pull request from the `master` branch against the `deploy` branch. Merges into `deploy` are automatically deployed to our production instance. [Start a deploy...](https://github.com/aredotna/ervell/compare/deploy...master?expand=1)

## Deploying (Staging)

URL: [staging.are.na](https://staging.are.na)

- Merges into `master` are automatically deployed to our staging instance.
- You can deploy your current local branch to staging if need be by exporting out the appropriate S3 keys and running `yarn run deploy-staging`
