const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Service API",
      version: "1.0.0",
      description: "API quản lý sản phẩm - Lab 2",
      contact: { name: "Dev Team", email: "dev@example.com" },
    },
    servers: [{ url: "http://localhost:3001", description: "Development" }],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "iPhone 15 Pro" },
            price: { type: "number", example: 27990000 },
            stock: { type: "integer", example: 50 },
            description: { type: "string" },
            imageUrl: { type: "string" },
            isActive: { type: "boolean", example: true },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Điện thoại" },
            slug: { type: "string", example: "mobile" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
