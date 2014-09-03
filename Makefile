#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that
# can be run in a Makefile task like `coffee lib/build_script`.
#
# Remember to set your text editor to use 4 size non-soft tabs.
#

BIN = node_modules/.bin
MIN_FILE_SIZE = 1000

# Start the server
s:
	$(BIN)/coffee index.coffee

# Start the server with forever
sf:
	$(BIN)/forever $(BIN)/coffee index.coffee

# Run all of the project-level tests, followed by app-level tests
test: assets
	$(BIN)/mocha $(shell find test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.coffee' -not -path 'test/helpers/*')

# Generate minified assets from the /assets folder and output it to /public.
assets:
	$(foreach file, $(shell find assets -name '*.coffee' | cut -d '.' -f 1), \
		$(BIN)/browserify $(file).coffee -t jadeify -t caching-coffeeify -u config.coffee > public/$(file).js; \
		$(BIN)/uglifyjs public/$(file).js > public/$(file).min.js; \
		gzip -f public/$(file).min.js; \
		mv public/$(file).min.js.gz public/$(file).min.js.cgz; \
	)
	$(BIN)/stylus assets -o public/assets --inline --include public/
	$(foreach file, $(shell find assets -name '*.styl' | cut -d '.' -f 1), \
		$(BIN)/sqwish public/$(file).css -o public/$(file).min.css; \
		gzip -f public/$(file).min.css; \
		mv public/$(file).min.css.gz public/$(file).min.css.cgz; \
	)

verify:
	if [ $(shell wc -c < public/assets/layout.min.css.cgz) -gt $(MIN_FILE_SIZE) ] ; then echo ; echo "layout CSS exists" ; else echo ; echo "Layout CSS asset compilation failed" ; exit 1 ; fi
	if [ $(shell wc -c < public/assets/layout.min.js.cgz) -gt  $(MIN_FILE_SIZE) ] ; then echo ; echo "layout JS exists" ; else echo; echo "Layout JS asset compilation failed" ; exit 1 ; fi

deploy: assets verify
	$(BIN)/bucketassets -d public/assets -b ervell-production
	$(BIN)/bucketassets -d public/images -b ervell-production
	heroku config:add \
		ASSET_PATH=//d2hp0ptr16qg89.cloudfront.net/assets/$(shell git rev-parse --short HEAD)/ \
		--app=ervell
	git push git@heroku.com:ervell.git master

.PHONY: test assets
