# nestjs-backend-boilerplate
**Boilerplate code for NestJS backends.**

This repository contains a boilerplate NestJS based backend that by default runs ExpressJS. It is used in the majority of GSWRX projects to ensure that there is substantial overlap between backends within our innovation projects. However, it is licensed to be used in an open source way.

## Table of contents
- [nestjs-backend-boilerplate](#nestjs-backend-boilerplate)
  * [Table of contents](#table-of-contents)
  * [Boilerplate walkthrough](#boilerplate-walkthrough)
    + [Folder structure](#folder-structure)
    + [Authentication and authorization](#authentication-and-authorization)
    + [Security measures](#security-measures)
  * [Running the boilerplate](#running-the-boilerplate)
    + [Developer mode](#developer-mode)
    + [Production mode](#production-mode)
  * [License](#license)

## Boilerplate walkthrough
### Folder structure
### Authentication and authorization
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