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
