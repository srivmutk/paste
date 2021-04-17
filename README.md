## Sysnomid Paste Server

Source code for Sysnomid Paste, under Apache 2.0 License

### The Stack

#### Backend

- Golang w/Echo and Pgxpool

### Frontend

- NextJS w/Typescript and TailwindCSS

### Setup

Rename .ex.env to .env in project root

Change CORS_ORIGIN, DATABASE_URL, and SERVER_URL to appropraite values

### TODO

- Get Authentication setup
- Get syntax highlighting when people are creating a paste
- Add an API route to get the raw text of a paste
- Add a CLI
