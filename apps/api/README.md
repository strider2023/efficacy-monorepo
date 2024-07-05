![Alt text](./public/efficacy-logo.svg "Title")
# Efficacy
### Metadata driven application creator.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

At it's core Efficacy is an metadata manager that helps you build no-code applications for a quickstart to test any MVP. It comes with an Admin portal and Demo Application so no need to code to get a concept working.

Note: It is still in early stages of development.


## Tech Stack

**Client:** React, MUI, React-Jsonschema-Form

**Server:** Node, Express, Knex, Swagger

**Database:** Postgres


## Features

- Manage Collections using built in admin portal
- Collections directly reflect on the database 
- Manage application assets
- Generate no code web application on the fly


## Environment Variables

To run this project, you will need to add the following environment variables to your .env 

`CACHE_URL=localhost:11211`

`DB_CLIENT=pg`

`DB_HOST=localhost`

`DB_PORT=5432`

`DB_USERNAME=postgres`

`DB_PASSWORD=****`

`DB_DATABASE=efficacy`

`SECRET_KEY=mysecretkey`

`TOKEN_ISSUER=efficacy`

`JWT_EXPIRY=28800`

`ADMIN_EMAIL=test@test.com`

`ADMIN_PASSWORD=test@123`

`RATE_LIMITER_TIME_LIMIT_MILLIS=3600000`

`RATE_LIMITER_MAX_CALL_COUNT=200`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Authors

- [@strider2023](https://www.github.com/strider2023)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


