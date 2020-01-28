# Dockerfile for building production-ready NodeJS APi
FROM node:lts
LABEL maintainer='christian@degasfabriek.com'
WORKDIR /usr/src/app
COPY ./package.json ./package.json
RUN npm install pm2 -g
RUN npm install --only=prod
COPY ./dist ./dist
CMD ["pm2-runtime", "./dist/pm2.config.js"]
