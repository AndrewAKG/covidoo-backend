# Covidoo Backend

this is the backend service for [Covidoo App](https://github.com/AndrewAKG/react-covid-tracker)

## Deployment

Deployment is done using [AWS Copilot](https://aws.amazon.com/containers/copilot), a Command line interface for containerized applications and [AWS API Gateway](https://aws.amazon.com/api-gateway)

This deploys the service to AWS ECS with Fargate mode, and exposes http endpoint for the service via an elastic load balancer, then you can integrate custom http with API Gateway for an https endpoint for the service since there is no custom domain to attach the https listener for the elb.

## API Docs

run the server on localhost:3000 and navigate to `/api-docs` for swagger doc of the api

### Available Routes

#### Public routes

-   `[GET] /` index route for checking connection and health checks for elb
-   `[GET] /users-data` returns list of users with their locations and vitals data

#### Private routes

-   `[GET] /users-data/history` returns list of vitals records for specific user
-   `[POST] /users-data` post a new vital record for specific user

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
watches for changes using nodemon

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles node app in production mode and optimizes the build for the best performance.

### `npm start`

Runs the app in the production mode.\
server run using node, thus changes won't be watched

### `make`

builds docker image for the app, make sure docker deamon is up

### `make run`

runs a container based on built image

## Env File Keys

-   `PORT` server port
-   `DB_CONNECTION_URL` mongodb connection url
-   `AUTH0_DOMAIN` auth0 domain
-   `AUTH0_AUDIENCE` auth0 audience
-   `LOG_FORMAT` (dev, combined) for logger
-   `LOG_DIR` logger directory
-   `ORIGIN` cors origin
-   `CREDENTIALS` cors credentials
