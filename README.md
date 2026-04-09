# Lab 2 - Microservices với Node.js

**Sinh viên:** Lê Huy Trường  
**MSSV:** N23DCCN064

## Kiến trúc hệ thống

| Service         | Port | Database            |
| --------------- | ---- | ------------------- |
| API Gateway     | 3000 | —                   |
| Product Service | 3001 | PostgreSQL (Prisma) |
| Order Service   | 3002 | MongoDB (Mongoose)  |
| Auth Service    | 3003 | PostgreSQL (Prisma) |

## Công nghệ sử dụng

- Node.js + Express
- Prisma ORM + PostgreSQL (Supabase)
- Mongoose + MongoDB (Atlas)
- JWT Authentication
- Swagger UI (OpenAPI 3.0)
- Docker + Docker Compose
- Redis Cache
- Cloudinary (Image Upload)
- Railway (Deploy)

## Cách chạy local

### 1. Clone project

```bash
git clone https://github.com/Lht09112005/N23DCCN064_LeHuyTruong_Web_Prac2.git
cd N23DCCN064_LeHuyTruong_Web_Prac2
```

### 2. Chạy bằng Docker Compose

```bash
docker-compose up -d
```

### 3. Chạy từng service

```bash
# Product Service
cd product-service
npm install
node src/index.js

# Order Service
cd order-service
npm install
node src/index.js

# Auth Service
cd auth-service
npm install
node src/index.js

# API Gateway
cd api-gateway
npm install
node src/index.js
```

## API Documentation

- Product Service: http://localhost:3001/api-docs
- Order Service: http://localhost:3002/api-docs
- Auth Service: http://localhost:3003/api-docs

## Deploy

- Product Service: https://n23dccn064lehuytruongwebprac2-production.up.railway.app/api/products
