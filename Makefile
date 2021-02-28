install:
	npm ci

link:
	npm link

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test

test-watch:
	npm run test-watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8
