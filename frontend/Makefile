start-frontend:
	npm run dev

start:
	npx start-server -s ./dist

develop:
	npx start-server -s ./dist & npm run dev

build:
	rm -rf dist
	npm run build

lint:
	npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml .
