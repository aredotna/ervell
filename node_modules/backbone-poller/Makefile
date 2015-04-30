all: npm minify.code test

npm:
	@echo "`date`\tUpdating node modules"
	@npm install
	@npm update

minify.code:
	@echo "`date`\tMinifying javascript"
	@grunt uglify

test.lint:
	@echo "`date`\tRunning a javascript linter"
	@grunt jshint

test.unit:
	@echo "`date`\tRunning unit tests"
	@grunt jasmine

test: test.lint test.unit

docs:
	@echo "`date`\tCreating annotated source code"
	@grunt docco
	@mv docs/backbone.poller.html index.html
	@mv docs/docco.css .
	@rm -rf docs
	@git add index.html docco.css
	@git ci -m "Updated annotated soucre code"
