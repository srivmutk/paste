## Sysnomid Paste Server

Source code for paste.sysnomid.com, under Apache 2.0 License

### The Stack

#### Backend

- Golang w/Echo and Pgxpool

### Frontend

- Next w/Typescript and TailwindCSS

### Setup

1. Get PostgreSQL setup

2. Rename .env.example to .env, and change `DATABASE_URL` to your Postgres connection DSN, and `SERVER_URL`, to what URL you plan to access the API from, for example `api.paste.sysnomid.com`.

3. Get Golang and NodeJS setup, and then run `make p-install` or `go get ./... && cd web && npm i`.

4. For a Production Environment run `make p-start` or `go build -o main && ./main & cd web && npm run build && npm run start && fg`

5. For a Development Environment run `make p-dev` or `air & cd web && npm run dev && fg`

### Docker

Run `make docker` to get a container with the paste API.

### TODO

- Add a CLI
