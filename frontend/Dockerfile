FROM node:16-alpine

WORKDIR /app/frontend/

COPY ./package*.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY . /app/frontend/

CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true
