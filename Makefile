
DOCKER_CONTAINER_NAME=paste_server
WEB_DIR=cd web
GO_INSTALL=go get ./...
GO_BUILD=go build -o main

p-install:
	${GO_INSTALL} && ${WEB_DIR} && npm i

p-dev:
	make s-start & make w-start && fg

p-start:
	make s-build && ./main & make w-build && fg

s-build: main.go
	${GO_BUILD}

s-start: main.go
	air

w-build:
	${WEB_DIR} && npm run build && npm run start

w-start:
	${WEB_DIR} && npm run dev

docker:
	docker build -t ${DOCKER_CONTAINER_NAME} . && docker run -dp 127.0.0.1:4300:4300 ${DOCKER_CONTAINER_NAME}


