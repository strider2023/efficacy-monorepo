FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i --silent
RUN npm install pm2 -g

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime","build/src/index.js"]