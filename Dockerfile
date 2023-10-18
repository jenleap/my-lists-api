FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install 

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD [ "npm", "run", "prod" ]