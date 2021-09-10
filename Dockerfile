FROM node:alpine

LABEL maintainer "nicolas.heissler1@gmail.com"

ADD BookManager.js . connect.js . TestApi.js .

ENTRYPOINT [ "node", "BookManager.js", "connect.js", "TestApi.js" ]
