FROM node:alpine

LABEL maintainer "lucile.comba-antonetti@isen.yncrea.fr"

ADD index.js ./

RUN npm install

ENTRYPOINT [ "node", "index.js" ]
