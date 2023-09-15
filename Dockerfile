FROM node:alpine

RUN adduser -D myuser

LABEL maintainer "eric.muellenbach@yncrea.fr"

USER myuser

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

ENTRYPOINT [ "node", "index.js" ]


#Ouvrir les ports pour que user et admin communiquent avec notre docker
EXPOSE 3306
EXPOSE 8080
