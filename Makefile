install:
	npm install

link:
	npm link

lint:
	npx eslint .

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

test:
	npm test
