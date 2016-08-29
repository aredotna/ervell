#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that
# can be run in a Makefile task like `coffee lib/build_script`.
#

BIN = node_modules/.bin
MIN_FILE_SIZE = 1000

# Start the server
s:
	REDIS_URL=redis://127.0.0.1:6379 API_URL=http://localhost:3000/v2 APP_URL=http://localhost:5000 foreman start

# Start the server with foreman and Redis
spc:
	REDIS_URL=redis://127.0.0.1:6379 APP_URL=http://localhost:5000 foreman start

# Run all of the project-level tests, followed by app-level tests
test: assets
	$(BIN)/mocha $(shell find test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.coffee' -not -path 'test/helpers/*')

# Generate minified assets from the /assets folder and output it to /public.
assets:
	$(BIN)/ezel-assets

verify:
	if [ $(shell wc -c < public/assets/root.css.cgz) -gt $(MIN_FILE_SIZE) ] ; then echo ; echo "root CSS exists" ; else echo ; echo "root CSS asset compilation failed" ; exit 1 ; fi
	if [ $(shell wc -c < public/assets/root.js.jgz) -gt  $(MIN_FILE_SIZE) ] ; then echo ; echo "root JS exists" ; else echo; echo "root JS asset compilation failed" ; exit 1 ; fi

deploy: assets verify
	$(BIN)/bucket-assets --bucket ervell-production
	heroku config:set COMMIT_HASH=$(shell git rev-parse --short HEAD) --app=ervell
	git push git@heroku.com:ervell.git $(branch):master -f

deploy-with-images: assets verify
	ulimit -n 10000
	$(BIN)/bucket-assets -d public/assets -b ervell-production
	$(BIN)/bucket-assets -d public/images -b ervell-production
	heroku config:add \
		ASSET_PATH=//d2hp0ptr16qg89.cloudfront.net/assets/$(shell git rev-parse --short HEAD)/ \
		--app=ervell
	heroku config:add \
		IMAGE_PATH=//d2hp0ptr16qg89.cloudfront.net/assets/$(shell git rev-parse --short HEAD)/ \
		--app=ervell
	git push git@heroku.com:ervell.git $(branch):master

deploy-staging: assets verify
	$(BIN)/bucket-assets --bucket ervell-production
	heroku config:set COMMIT_HASH=$(shell git rev-parse --short HEAD) --app=ervell-staging
	git push git@heroku.com:ervell-staging.git $(branch):master -f

.PHONY: test assets
