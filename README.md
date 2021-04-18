## Sysnomid Paste Server

Source code for paste.sysnomid.com, under Apache 2.0 License

### The Stack

#### Backend

- Golang w/Echo and Pgxpool

### Frontend

- Next w/Typescript and TailwindCSS

### Setup

1. Get PostgreSQL setup
2. Rename .env.example to .env, and change `DATABASE_URL` to your Postgres connection DSN, and `SERVER_URL`, to what URL you plan to access the API from.
3. Get Golang and NodeJS setup, and then run `make p-install` or `go get ./... && cd ui && npm i`.
4. Then run, `make server-start` or `air` and `make ui-start` or `cd ui && npm run dev` to get a development environment.

### Docker

Run `make docker` to get a container with the paste API.

### TODO

- Get Authentication setup
- Get syntax highlighting when people are creating a paste
- Add a CLI
