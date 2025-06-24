install:
	npm ci

build:
	rm -rf dist
	npm run build

start:
	make -C frontend start

dev:
	make -C frontend develop

lint:
	make -C frontend lint

start-backend:
	npm start

start-frontend:
	cd frontend && npm run dev

develop:
	npx start-server -s ./frontend/dist & cd frontend && npm run dev

linter:
	cd frontend
	npx eslint --config frontend/eslint.config.js --ignore-pattern "frontend/dist/**" .


