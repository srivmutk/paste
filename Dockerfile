FROM golang:alpine
WORKDIR /backend

COPY . .

RUN go get ./... && go build -o main . 

CMD ["/backend/main"]
