<img src="./readme-assets/logo.png" width="175" align="right">

# GSWRX nestjs-backend-boilerplate
**Boilerplate code for NestJS backends.**

This repository contains a boilerplate NestJS based backend that by default runs ExpressJS. It is used in the majority of GSWRX projects to ensure that there is substantial overlap between backends within our innovation projects. However, it is licensed to be used in an open source way.

## Table of contents
- [GSWRX nestjs-backend-boilerplate](#gswrx-nestjs-backend-boilerplate)
  * [Table of contents](#table-of-contents)
  * [Boilerplate walkthrough](#boilerplate-walkthrough)
    + [Folder structure](#folder-structure)
    + [Authentication](#authentication)
    + [Authorization](#authorization)
    + [Examples of authentication and authorization](#examples-of-authentication-and-authorization)
    + [Security measures](#security-measures)
    + [Setting up database clients](#setting-up-database-clients)
    + [Connecting to setup database clients](#connecting-to-setup-database-clients)
      - [Example for connecting to Pools](#example-for-connecting-to-pools)
  * [Running the boilerplate](#running-the-boilerplate)
    + [Developer mode](#developer-mode)
    + [Production mode](#production-mode)
      - [Harnessing the power of Docker](#harnessing-the-power-of-docker)
      - [Running it elsewhere](#running-it-elsewhere)
      - [Debug logs in production mode](#debug-logs-in-production-mode)
  * [Known issues and solutions](#known-issues-and-solutions)
    + [NestJS scheduler TypeError: common_1.applyDecorators is not a function](#nestjs-scheduler-typeerror--common-1applydecorators-is-not-a-function)
    + [Error with PostgreSQL client config: ENOENT /usr/src/app/dist/db.crt](#error-with-postgresql-client-config--enoent--usr-src-app-dist-dbcrt)
  * [License](#license)

## Boilerplate walkthrough
### Folder structure
This overview only shows the most important files.

```
project
|   .gitignore
|   docker-compose.yml
|   dockerfile
|   LICENSE
|   package.json
|   tslint.json
|   yarn.lock
│   README.md
│   tsconfig.json
│
└───node_modules
└───src
│   │   app.controller.ts
│   │   app.module.ts
│   │   main.ts
│   │   pm2.config.ts.example
│   │   role.guard.spec.ts
│   │   role.guard.ts
│   └───auth
|   |   |   (authentication module)
│   └───config
|   |   |   (configuration files)
│   │   │   constants.ts
│   │   │   postgres-clients.ts.example
│   └───decorators
|   |   |   (custom decorators used in the application)
│   └───example-auth
|   |   |   (example controllers & providers demonstrating auth)
│   └───example
|   |   |   (example controllers & providers without auth)
│   └───exceptions
|   |   |   (custom exceptions used in the application)
│   └───interfaces
|   |   |   (custom interfaces used in the application)
│   └───shared
|   |   |   (shared module, binds all shared controllers, providers & modules)
│   └───users
|   |   |   (users module, encapsulates user functionality).
└───src
│   │   End to end tests for the backend.
```

### Authentication
[`Passport`](http://www.passportjs.org/) is used to provide authentication. In this code, authentication is implemented by means of an `auth` module, which can be found in `./src/auth`. The authentication module provides an `AuthGuard` ([more on Guards](https://docs.nestjs.com/guards)) that accepts a valid Passport authentication strategy.

Currently, two of the many available Passport authentication strategies are provided by default: `local` (i.e. username/password) authentication as well as `jwt`-based authentication.

The `local` strategy is only used for one route: the login route, which transforms a `(username, password)` tuple into a valid [JSON Web Token](https://jwt.io/) should it be valid. _(In this boilerplate, validity is checked by means of a users list; obviously, in your project, you must connect to a database instead.)_. 

For all other routes, it is advised to _not_ use `local` authentication simply because login returns a JWT and usernames/passwords should be provided as infrequently as possible. Rather, use the `JWT` based strategy, which currently accepts the JWT as an Authorization Bearer Token.

**Important: generate jwt secret with (bash)**
```bash
openssl rand 256 | base64
```

Also feel free to implement other [Passport Strategies](http://www.passportjs.org/packages/) by creating your own [NestJS Auth Strategies](https://docs.nestjs.com/techniques/authentication).

### Authorization
Role-based authorization comes implemented by default. It has been created by means of a `RoleGuard`, which essentially checks in advance whether a certain user has the role that is required for passing the request to the route. If the user has no such role, the request is denied by means of a `HTTP 403 Forbidden` response, otherwise, the route is executed as intended.

### Examples of authentication and authorization
The `./example-auth/example-auth.controller` comes with examples of authentication and authorization:

* The `getAuthStatus` method, which is accessible at `HTTP GET /example-auth/simple`, performs JWT-based authentication _but no authorization_ by means of the `AuthGuard('jwt')`.
* The `getStrongAuthStatus` method, accessible at `HTTP GET /example-auth/strong`, performs **both** JWT-based authentication and role-based authorization: it implements an `AuthGuard('jwt')` _and_ the `RoleGuard`. More specifically, it only allows requests to be passed to the route if the user is of role `'admin'`. _(Note that multiple roles at once are supported; in that case, make it e.g. `@Roles('admin, 'normal')`)_ If all roles must be supported (essentially removing authorization while keeping authentication), fall back to the previous bullet point and remove the `RoleGuard` and `Routes` decorator altogether.

### Security measures
This boilerplate backend deploys various measures against security vulnerabilities. We use multiple packages for this:

* `helmet`, which groups various security vulnerability mitigations.
* `express-rate-limit`, for rate limiting requests.
* `cors`, for which we use NestJS's built-in facilities.

These types of attacks are covered by these packages:

* Cross origin resource sharing misuse
* Rate limit abuse.
* DNS Prefetch Control misuse
* Clickjacking
* Package-powered-by exploits
* Navigating users away to HTTP once they are on HTTPS (by means of HSTS).
* IE abuse.
* MIME sniffing.
* (Certain) XSS attacks.

### Setting up database clients
This repository natively supports connecting to multiple PostgreSQL databases by means of client pools. In the configuration file `./postgres-clients.ts`, you can add as many clients as you wish. Note that for reasons of security, the `.ts` file cannot be pushed to any repository; rather, an `.example` file is available to demonstrate the structure. Copy and paste the example file to the true `.ts` file, **but do not add any credentials you really use to the example file!**

[Why not?](https://hackernoon.com/developers-are-unknowingly-posting-their-credentials-online-caa7626a6f84)

The clients configuration file exports an object that maps connection details to client keys. It looks as follows by default and can be adapted (by adding other objects or changing credential details).

```
const PostgresClients = {
  boilerplateDb: {
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    db: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
  },
};
export default PostgresClients;

```

In the example above, `.env`-provided credentials will be used to connect to the database.

Once they have been configured, the backend will attempt to create `Pools` ([what are Pools?](https://node-postgres.com/features/pooling)) for them on startup. Note that Pool creation in the [postgres-pool.service.ts](./src/postgres-pool/postgres-pool.service.ts) file involves adding a `.crt` file for setting up an SSL connecting to your database.

```
[Nest] 21360   - 2019-08-27 10:54   [Postgres DB init] Found 1 client(s) in configuration.
[Nest] 21360   - 2019-08-27 10:54   [Postgres DB init] Setting up client pool for 'boilerplateDb' client.
[Nest] 21360   - 2019-08-27 10:54   [Postgres DB init] Connecting to 'boilerplateDb' pool.
[Nest] 21360   - 2019-08-27 10:54   [Postgres DB init] Connected to 'boilerplateDb' pool - connected to <databasename>.
```

Nice. But how to access pools? Let's find out. 👇

### Connecting to setup database clients
Database connections are provided by the `PostgresPoolService` that is available at [postgres-pool.service.ts](./src/postgres-pool/postgres-pool.service.ts). It runs from the `AppModule` and by consequence:

* Initializes on startup globally benefiting from the principle of dependency injection. You can thus easily inject the database pools in any other service whatsoever and have access to the configured pools.
* On initialization, it automatically provides the pool information (see 👆) and makes them publicly (readonly) available in `this.pools` for connection later (see 👇).
* If you thus wish to use the database pools the backend created based on your config, [inject the `PostgresPoolService Provider`](https://docs.nestjs.com/providers) into the class you'll wish to use the clients in, e.g. as `this.dbPoolService`. You can then access the pools with `this.dbPoolService.pools.<configurationKey>`, where `configurationKey` is the key from the key-value combination provided in your configuration file (in the example 👆 e.g. `exampleDatabase`).
* An example for setting up a connection based on a pool defined in the `PostgresPoolService` can be found below.
* **Make sure to release clients immediately after use, to keep your pool sane!**

#### Example for connecting to Pools
```
// Check if pool exists and was initialized properly.
if (this.pgPoolService && this.pgPoolService.pools && this.pgPoolService.pools.exampleDatabase) {

  // Connect to the pool
  this.pgPoolService.pools.exampleDatabase.connect().then((client) => {

    // Check if an error has been reported.
    if (!client) {
      this.logger.error(`Error on connecting to 'exampleDatabase' pool: no client.`, constants.postgresBootstrapContext);
      return false;
    }

    // No error: do a select for the current database
    return client.query('SELECT current_database() AS connected_to_db;')
              .then((res) => {
                this.logger.log(`Success on 'exampleDatabase' pool connection test - connected to ${
                    res.rows && res.rows[0] ? res.rows[0].connected_to_db : ''}.`, constants.postgresBootstrapContext);
                client.release();
              })
              .catch((err) => {
                this.logger.error(`Error on connecting to 'exampleDatabase' pool: '${err}'.`, constants.postgresBootstrapContext);
                client.release();
              });

  });

}
```

## Running the boilerplate

### Developer mode
Please execute these steps to run the NestJS boilerplate. Note that by default, we expect users to install dependencies with `yarn`. Hence, a yarn package lock file is provided in the repository. However, should you wish to use npm instead, this is possible by deleting the lockfile first and subsequently using `npm` commands.

1. Clone the repository: `git clone git@github.com:gswrx/nestjs-backend-boilerplate.git`.
2. Update the `Git` remotes of the cloned repository to point to your own repository.
    - [Find out how here.](https://help.github.com/en/articles/changing-a-remotes-url)
3. Ensure that the NestJS CLI is installed globally with `npm`:
    - `npm i -g @nestjs/cli`
4. Ensure that the `node_modules` dependencies are installed in your `nestjs-backend-boilerplate` folder with either `npm` or `yarn`, preferably the latter:
    - `npm install`
    - `yarn install`
5. Developer mode: start the backend by means of `npm` or `yarn`, preferably the latter:
  	- `npm run start`
    - `yarn run start`

For production mode, see [Production build: Docker container](#production-build--docker-container).

[Help, my `yarn` commands do not work!](https://yarnpkg.com/en/docs/install)

### Production mode
#### Harnessing the power of Docker
This repository provides a Docker Compose file which is configured to start the backend at port `3000` together with an empty PostgreSQL database that runs on port `5432` and harnesses a `bridge` network to allow the backend to reach it. The application itself runs in [pm2](http://pm2.keymetrics.io/).

In order to run this, you'll need [yarn](https://yarnpkg.com/en/docs/install) as well as [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

To run it in production mode:

* `yarn build` - transpile TypeScript into JavaScript into the `./dist` folder
* `docker-compose build` - build the Docker image for the backend
* `docker-compose up -d` - run the database and backend in the background (`-d`).

The backend should now be reachable at `http://localhost:3000`. A PostgreSQL database should now be accessible from the backend container at `host = pg-database; port = 5432`.
Please edit the compose file providing the PostgreSQL database password or, preferably, add this to an `.env` file before running `docker-compose` commands.

#### Running it elsewhere
You are also free to run the application elsewhere, without Docker, e.g. directly on some host system. You may find the following pointers useful:
* `yarn build` transpiles the TypeScript backend code into executable JavaScript into the `./dist` folder.
* You could then do something like:
  * `node ./dist/main.js` (if you provide the required environment variables `PORT` and `POSTGRES_CLIENTS` yourself with e.g. `dotenv`; we **discourage** this for production - [read why here](https://www.freecodecamp.org/news/you-should-never-ever-run-directly-against-node-js-in-production-maybe-7fdfaed51ec6/)).
  * `pm2 ./dist/main.js` if you provide the required environment variables `PORT` and `POSTGRES_CLIENTS` yourself.
  * `pm2 ./dist/pm2.config.js` if you wish to run with the environment variables as configured for `pm2` usage.

#### Debug logs in production mode
Please note that all `debug` logs written with `AppLoggerService` logging are written locally, but are masked in Papertrail. Instead, you will see the following log:

`Debug logs are masked. Please remove them from production environment.`

## Known issues and solutions
### NestJS scheduler TypeError: common_1.applyDecorators is not a function
When using the NestJS `Scheduler` functionality, you may run into this error:

```
 return common_1.applyDecorators(common_1.SetMetadata(schedule_constants_1.SCHEDULE_CRON_OPTIONS, Object.assign(Object.assign({}, options), { cronTime })), common_1.SetMetadata(schedule_constants_1.SCHEDULER_NAME, name), common_1.SetMetadata(schedule_constants_1.SCHEDULER_TYPE, scheduler_type_enum_1.SchedulerType.CRON));
                    ^
TypeError: common_1.applyDecorators is not a function
```

The solution here is as follows:

1. Install the `nest-schedule` package. Ensure that all `imports` import from `nest-schedule` instead of `@nestjs/schedule`.
2. Create a separate class, e.g. `AuthSchedule`, and ensure that it `extends NestSchedule` (see example below).
3. Add this class to the `providers` section of the respective `module`, e.g. `AuthModule`.

Then, scheduling should work nicely.

Example for schedule class:

```
import { NestSchedule, Cron } from 'nest-schedule';

@Injectable()
export class LocalIamSchedule extends NestSchedule {
```

### Error with PostgreSQL client config: ENOENT /usr/src/app/dist/db.crt
An error like this indicates that you have not configured the path to the `db.crt` file in your [postgres-pool.service.ts](./src/postgres-pool/postgres-pool.service.ts) file.

```
[Nest] 22680   - 2020-11-11 18:49:57   Error with PostgreSQL client config at ../config/postgres-clients.js. +2ms
Postgres DB init
[Nest] 22680   - 2020-11-11 18:49:57   Object:
{
  "errno": -4058,
  "syscall": "open",
  "code": "ENOENT",
  "path": "/usr/src/app/dist/db.crt"
}
 +2ms
 ```

## License
The `nestjs-backend-boilerplate` is licensed under the [MIT License](./LICENSE). You are free to use the boilerplate code commercially, to modify it, to distribute it and to use it privately. However, this requires that the limitations and other license conditions as provided by the license are respected.

Should you wish to obtain another license on the sublicenseable parts of this code, please feel free to get in touch with GSWRX B.V. via `{marcel.fortuin, christian.versloot}@gswrx.nl`. Please refer to this repository as well as that you request a different license. We will then get back to you as soon as possible.
