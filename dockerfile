# Dockerfile for building production-ready NodeJS APi
FROM node:lts-slim
LABEL maintainer='christian.versloot@gswrx.nl'
WORKDIR /usr/src/app
COPY ./package.json ./package.json
RUN npm install pm2 -g
RUN yarn install --production
RUN yarn build
CMD ["pm2-runtime", "./dist/pm2.config.js"]
