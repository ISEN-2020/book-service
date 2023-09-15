FROM node:alpine



LABEL maintainer "eric.muellenbach@yncrea.fr"



WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install
RUN adduser -D myuser
USER myuser

ENTRYPOINT [ "node", "index.js" ]


#Ouvrir les ports pour que user et admin communiquent avec notre docker
EXPOSE 3306
EXPOSE 8080
