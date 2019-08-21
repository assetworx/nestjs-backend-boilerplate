# nestjs-backend-boilerplate
**Boilerplate code for NestJS backends.**

This repository contains a boilerplate NestJS based backend that by default runs ExpressJS. It is used in the majority of GSWRX projects to ensure that there is substantial overlap between backends within our innovation projects. However, it is licensed to be used in an open source way.

## Table of contents
- [nestjs-backend-boilerplate](#nestjs-backend-boilerplate)
  * [Table of contents](#table-of-contents)
  * [Boilerplate walkthrough](#boilerplate-walkthrough)
    + [Folder structure](#folder-structure)
    + [Authentication](#authentication)
    + [Authorization](#authorization)
    + [Examples of authentication and authorization](#examples-of-authentication-and-authorization)
    + [Security measures](#security-measures)
  * [Running the boilerplate](#running-the-boilerplate)
    + [Developer mode](#developer-mode)
    + [Production mode](#production-mode)
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
│   │   constants.ts
│   │   main.ts
│   │   role.guard.spec.ts
│   │   role.guard.ts
│   └───auth
|   |   |   (authentication module)
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

Also feel free to implement other [Passport Strategies](http://www.passportjs.org/packages/) by creating your own [NestJS Auth Strategies](https://docs.nestjs.com/techniques/authentication).

### Authorization
Role-based authorization comes implemented by default. It has been created by means of a `RoleGuard`, which essentially checks in advance whether a certain user has the role that is required for passing the request to the route. If the user has no such role, the request is denied by means of a `HTTP 403 Forbidden` response, otherwise, the route is executed as intended.

### Examples of authentication and authorization
The `./example-auth/example-auth.controller` comes with examples of authentication and authorization:

* The `getAuthStatus` method, which is accessible at `HTTP GET /example-auth/simple`, performs JWT-based authentication _but no authorization_ by means of the `AuthGuard('jwt')`.
* The `getStrongAuthStatus` method, accessible at `HTTP GET /example-auth/strong`, performs **both** JWT-based authentication and role-based authorization: it implements an `AuthGuard('jwt')` _and_ the `RoleGuard`. More specifically, it only allows requests to be passed to the route if the user is of role `'admin'`. _(Note that multiple roles at once are supported; in that case, make it e.g. `@Routes('admin, 'normal')`)_ If all roles must be supported (essentially removing authorization while keeping authentication), fall back to the previous bullet point and remove the `RoleGuard` and `Routes` decorator altogether.

### Security measures
This boilerplate backend deploys various measures against security vulnerabilities. We use multiple packages for this:

* `helmet`, which groups various security vulnerability mitigations.
* `csurf`, which protects you against cross-site request forgery.
* `cors`, for which we use NestJS's built-in facilities.

These types of attacks are covered by these packages:

* Cross origin resource sharing misuse
* Cross-site request forgery
* DNS Prefetch Control misuse
* Clickjacking
* Package-powered-by exploits
* Navigating users away to HTTP once they are on HTTPS (by means of HSTS).
* IE abuse.
* MIME sniffing.
* (Certain) XSS attacks.

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
To do.

## License
The `nestjs-backend-boilerplate` is licensed under the [MIT License](./LICENSE). You are free to use the boilerplate code commercially, to modify it, to distribute it and to use it privately. However, this requires that the limitations and other license conditions as provided by the license are respected.

Should you wish to obtain another license on the sublicenseable parts of this code, please feel free to get in touch with GSWRX B.V. via `{marcel, christian, albert}@degasfabriek.com`. Please refer to this repository as well as that you request a different license. We will then get back to you as soon as possible.