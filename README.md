# Air Quality

## Introduction:
This project provides the ability to view and store basic pollution information on certain locations, using the [AirVisual API](https://api-docs.iqair.com/).

It utilizes `nodejs`, `typescript` and `postgres` and uses multiple libraries in order to achieve intended behavior:
- `axios` to call third party APIs.
- `express` to create our own APIs.
- `jest` to test everything.
- `sequelize` as an ORM tool.
- `pg` to access the postgres database.
- `toad-scheduler` to create cron jobs.

<br>

## Getting started
Start up the application locally:
<br>
#### 1. Create your own postgres database, being mindful of `db_name`, `db_user`, `db_password`, `db_host`, `db_port`.
#### 2. Create AirVisual API key using this [portal](https://dashboard.iqair.com/).
#### 3. Run the following commands:
```
npm install //To install all required packages
npm build //To transpile all typescript files into .js
npm start //To start the server
npm db:migrate //To create the table schema in the database
```

Make sure to include the environment variables in a .env file. This file would look something like this:

```
DB_NAME=<DB_NAME>
DB_USER=<DB_USER>
DB_PASSWORD=<DB_PASSWORD>
DB_HOST=<DB_HOST>
DB_PORT=<DB_PORT>

TEST_DB_NAME=<TEST_DB_NAME>
TEST_DB_USER=<TEST_DB_USER>
TEST_DB_PASSWORD=<TEST_DB_PASSWORD>
TEST_DB_HOST=<TEST_DB_HOST>
TEST_DB_PORT=<TEST_DB_PORT>

AIRVISUAL_API_KEY=<AIRVISUAL_API_KEY>
AIRVISUAL_HOST=<AIRVISUAL_HOST>

PORT=<PORT>
```

## API
#### - To fetch air pollution info for nearest city
```
GET /pollution_by_coordinates?lat=<LATITUDE>&lon=<LONGITUDE>

Response: {
    "results": {
        "pollution": {
            "ts": <STRING>
            "aqicn": <INTEGER>
            "aqius": <INTEGER>
            "maincn": <STRING>
            "mainus": <STRING>
        }
    }
}
```

## Jobs
#### - In order to retrieve pollution information and log them in our DB we can run a cronjob dedicated for it which runs every minute once it is started up.
- #### Retrieve and fill "Paris" data:
```
npm run job:fillDb runFillParisPollutionJob
```
