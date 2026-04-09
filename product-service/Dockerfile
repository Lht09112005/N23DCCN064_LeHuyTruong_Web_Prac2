FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Hạ Prisma xuống v5 cho Railway
RUN npm install
RUN npm install prisma@5 @prisma/client@5

COPY prisma ./prisma

RUN npx prisma generate

COPY src ./src

EXPOSE 3001

CMD ["node", "src/index.js"]