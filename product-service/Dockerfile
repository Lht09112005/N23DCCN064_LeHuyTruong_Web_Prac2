FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY node_modules ./node_modules

COPY src ./src

EXPOSE 3001

CMD ["node", "src/index.js"]