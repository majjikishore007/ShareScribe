FROM node:20-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.prod .env

RUN npm run build

CMD [ "npm", "start" ]
