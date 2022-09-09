FROM node:alpine

LABEL maintainer "lucile.comba-antonetti@isen.yncrea.fr"

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

ENTRYPOINT [ "node", "index.js" ]
