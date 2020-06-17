# Description
Backend API built with Node.js, Express, GraphQL, Postgres, and Sequelize. This service fetches movie from 3rd party and stores personal watchlist.

## Instructions

1. Node.js and Postgres is installed.
2. Run `yarn install` or `npm install`
3. Create a default postgres database on the command line:
`initdb /usr/local/var/postgres`
4. Start Postgres database server: 
`pg_ctl -D /usr/local/var/postgres start`
4. Run `yarn dev` to start REST API server or `yarn dev:graphql` to start GraphQL server

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app built with REST API in the development mode in [http://localhost:4000](http://localhost:4000).<br />

The application will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn dev:graphql`

Runs the app built with GraphQL in the development mode in [http://localhost:4000](http://localhost:4000).<br />

The application will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />

### `yarn start`

After running `yarn build`, run this script to start the app in the production mode in [http://localhost:4000](http://localhost:4000).<br />