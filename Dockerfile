FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npx prisma init

RUN npx prisma generate

EXPOSE 3001

CMD [ "npm", "run", "prod" ]