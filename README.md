<div align="center">
  <img src="https://raw.githubusercontent.com/Sysnomid/paste/master/web/public/paste.png" width="200" height="200" />

## Simple Paste Server

</div>

### Stack

### Backend

- Golang w/ Echo and Pgxpool

### Frontend

- Typescript w/ NextJS, TailwindCSS, PrismJS, SWR and React-Hook-Form

### Setup

1. Get PostgreSQL setup

2. Rename .env.example to .env, and change `DATABASE_URL` to your Postgres connection DSN, and `SERVER_URL`, to what URL you plan to access the API from.

3. Get Golang and NodeJS setup, and then run `make p-install` or `go get ./... && cd web && npm i`.

4. For a Production Environment run `make p-start` or `go build -o main && ./main & cd web && npm run build && npm run start && fg`

5. For a Development Environment run `make p-dev` or `air & cd web && npm run dev && fg`

#### Docker

Run `make docker` or `docker build -t paste_server . && docker run -dp 4300:4300 paste_server` to get a container with the paste API.

#### POST `/p-create`

Used to Create a Paste.

Example cURL:

All fields listed are required except for `expires_at`.

If the request went through without error, you will receive a unique id that you can then access your paste from.

List of supported languages are available at `create.sql`

To specify an expiry date, use the `TIMESTAMP WITH TIME ZONE` format, (https://www.postgresql.org/docs/9.1/datatype-datetime.html)

Example - `2030-04-23 01:10`

#### GET `/p/:id`

Used to access pastes and their associated data in JSON.

Example Response:

```
{
 "ID": 10765432100123456789,
 "Title": "Untitled",
 "CreatedAt": "2021-04-18T19:45:01.406173Z",
 "Language": "none",
 "LanguageDisplayName": "Plaintext"
}
```

#### GET `/p/:id/raw`

Used to get the body of a paste in plaintext.
