FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npx tsx node_modules/.bin/prisma generate

COPY src ./src

EXPOSE 3001

CMD ["node", "src/index.js"]