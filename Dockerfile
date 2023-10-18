FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

RUN npx prisma init

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "prod" ]