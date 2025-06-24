install:
	npm ci

build:
	rm -rf frontend/dist
	npm run build

start-backend:
	npm start

start-frontend:
	cd frontend && npm run dev

dev:
	npx start-server -s ./frontend/dist & cd frontend && npm run dev

lint:
	cd frontend
	npx eslint --config frontend/eslint.config.js --ignore-pattern "frontend/dist/**" .
