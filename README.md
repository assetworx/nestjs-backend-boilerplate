# nestjs-backend-boilerplate
This repository contains a boilerplate NestJS based backend that by default runs ExpressJS. It is used in the majority of GSWRX projects to ensure that there is substantial overlap between backends within our innovation projects. However, it is licensed to be used in an open source way.

## Table of contents
- [nestjs-backend-boilerplate](#nestjs-backend-boilerplate)
  * [Table of contents](#table-of-contents)
  * [Running the backend boilerplate](#running-the-backend-boilerplate)
  * [Structure](#structure)
  * [Production build: Docker container](#production-build--docker-container)
  * [License](#license)

## Running the backend boilerplate
Please execute these steps to run the NestJS boilerplate. Note that by default, we expect users to install dependencies with `yarn`. Hence, a yarn package lock file is provided in the repository. However, should you wish to use npm instead, this is possible by deleting the lockfile first and subsequently using `npm` commands.

1. Clone the repository: `git clone git@github.com:gswrx/nestjs-backend-boilerplate.git`.
2. Ensure that the NestJS CLI is installed globally with `npm`:
    - `npm i -g @nestjs/cli`
3. Ensure that the `node_modules` dependencies are installed in your `nestjs-backend-boilerplate` folder with either `npm` or `yarn`, preferably the latter:
    - `npm install`
    - `yarn install`
4. Developer mode: start the backend by means of `npm` or `yarn`, preferably the latter:
  	- `npm run start`
    - `yarn run start`

For production mode, see [Production build: Docker container](#production-build--docker-container).

## Structure

To do.

## Production build: Docker container

To do.

## License
The `nestjs-backend-boilerplate` is licensed under the [GNU Affero General Public License v3.0](./LICENSE). You are free to use the boilerplate code commercially, to modify it, to distribute it. Additionally, patent and private use is granted. However, this requires that the limitations and other license conditions as provided by the license are respected.

Should you wish to obtain another license, please feel free to get in touch with GSWRX B.V. via `{marcel, christian, albert}@degasfabriek.com`. Please refer to this repository as well as that you request a different license. We will then get back to you as soon as possible.