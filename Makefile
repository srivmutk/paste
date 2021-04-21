
DOCKER_CONTAINER_NAME=sysnomid_paste_server
UI_DIR=cd web
GO_INSTALL=go get ./...
GO_BUILD=go build -o main

p-install:
	${GO_INSTALL} && ${UI_DIR} && npm i

server-install: main.go
	${GO_INSTALL}

server-build: main.go
	${GO_BUILD}

server-start: main.go
	air

web-install: 
	${UI_DIR} && npm i

web-start:
	${UI_DIR} && npm run dev

docker:
	docker build -t ${DOCKER_CONTAINER_NAME} . && docker run -dp 4300:4300 ${DOCKER_CONTAINER_NAME}


