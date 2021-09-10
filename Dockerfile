FROM node:alpine

LABEL maintainer "lucile.comba-antonetti@isen.yncrea.fr"

ADD BookManager.js connect.js TestApi.js ./

ENTRYPOINT [ "node", "BookManager.js", "connect.js", "TestApi.js" ]
