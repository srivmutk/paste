## Sysnomid Paste Server

Source code for paste.sysnomid.com, under Apache 2.0 License

### The Stack

#### Backend

- Golang w/ Echo and Pgxpool

### Frontend

- Next w/ Typescript and TailwindCSS

### Setup

1. Get PostgreSQL setup

2. Rename .env.example to .env, and change `DATABASE_URL` to your Postgres connection DSN, and `SERVER_URL`, to what URL you plan to access the API from, for example `api.paste.sysnomid.com`.

3. Get Golang and NodeJS setup, and then run `make p-install` or `go get ./... && cd web && npm i`.

4. For a Production Environment run `make p-start` or `go build -o main && ./main & cd web && npm run build && npm run start && fg`

5. For a Development Environment run `make p-dev` or `air & cd web && npm run dev && fg`

### API
To create a paste with the API, POST to `https://api.paste.sysnomid.com/p-create`.

``` 

Example curl:

curl --request POST \
  --url https://api.paste.sysnomid.com/p-create \
  --header 'Content-Type: application/json' \
  --data '{
        "title": "Untitled",
        "text": "Untitled",
        "language": "go",
        "expires_at": null
}'

```

If the request went through without error, you will receive a unique id that you can then access your paste from at ``` https://api.paste.sysnomid.com/p/PASTE_RESPONSE_ID ```.

List of supported languages are available at ``` https://api.paste.sysnomid.com/langs ```

To specify an expiry date, use the ``` TIMESTAMP WITH TIME ZONE ``` format, (https://www.postgresql.org/docs/9.1/datatype-datetime.html)
Example - ``` 2030-04-23 01:10 ```

To access pastes, GET ``` https://api.paste.sysnomid.com/p/PASTE_ID ``` for a JSON response body, or GET ``` https://api.paste.sysnomid.com/p/PASTE_ID/raw ``` for a version in plaintext.

For example, ``` https://api.paste.sysnomid.com/p/1385764483141472256 ``` and ``` https://api.paste.sysnomid.com/p/1385764483141472256/raw ```

### Docker

Run `make docker` to get a container with the paste API.

### TODO

- Add a CLI
