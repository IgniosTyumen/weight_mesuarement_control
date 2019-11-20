FROM node:slim

LABEL maintainer="Aksarin Mikhail <aksarin_myu@smart-transport.ru>"

ADD . /opt/app

WORKDIR /opt/app

RUN npm i

CMD ["npm", "start"]