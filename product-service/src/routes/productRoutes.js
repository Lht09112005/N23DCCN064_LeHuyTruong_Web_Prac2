const router = require("express").Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const { productValidation } = require("../middleware/validate");
const { upload } = require("../middleware/upload");
const { cacheMiddleware, clearCache } = require("../middleware/cache");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [name, price, createdAt], default: createdAt }
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc], default: desc }
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/", cacheMiddleware(300), getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *               stock: { type: integer }
 *               categoryId: { type: integer }
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       422:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", productValidation, async (req, res, next) => {
  await clearCache();
  return createProduct(req, res, next);
});

router.get("/:id", cacheMiddleware(300), getProductById);

router.put("/:id", async (req, res, next) => {
  await clearCache();
  return updateProduct(req, res, next);
});

router.delete("/:id", async (req, res, next) => {
  await clearCache();
  return deleteProduct(req, res, next);
});

/**
 * @swagger
 * /api/products/{id}/image:
 *   post:
 *     summary: Upload ảnh sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload thành công
 */
router.post("/:id/image", upload.single("image"), async (req, res, next) => {
  await clearCache();
  return uploadImage(req, res, next);
});

module.exports = router;
