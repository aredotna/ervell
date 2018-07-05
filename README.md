# Ervell

Front-end Are.na client, built using Artsy's [Ezel](https://github.com/artsy/ezel). Also made possible by Artsy's very generous decision to open source their front-end client. Many patterns (also bits of code, probably) adopted from [Force](https://github.com/artsy/force-public). Thanks dudes.

The general idea here is something minimal, utilitarian, unobtrusive and adaptible to many different situations. We try to make use of re-usable components and views as often as possible.

* * *

### Getting Started (Local)

* Fork this repo
* Install [Foreman](https://github.com/ddollar/foreman) or [Forego](https://github.com/ddollar/forego)
* Obtain a set of .env files (.env.dev, .env.staging, .env.prod) from [@dzucconi](https://github.com/dzucconi) or [@broskoski](https://github.com/broskoski)
* Install [Yarn](http://brewformulas.org/Yarn)
* Install dependencies: `yarn install`

### Running the server

```bash
  foreman start -f Procfile.dev -e .env.dev
  # => Listening on port 5000
```

You can point at different instances using different .env files (local/staging/prod).

-----

## Deploying (Production)

URL: [www.are.na](https://www.are.na)

* Create a new pull request from the `master` branch against the `deploy` branch. Merges into `deploy` are automatically deployed to our production instance

## Deploying (Staging)

URL: [staging.are.na](https://staging.are.na)

* Merges into `master` are automatically deployed to our staging instance.
* You can deploy your current local branch to staging if need be by exporting out the appropriate S3 keys and running `yarn run deploy-staging`
