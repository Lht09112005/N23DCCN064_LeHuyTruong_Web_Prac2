const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

const cacheMiddleware =
  (duration = 300) =>
  async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    try {
      const cached = await redis.get(key);
      if (cached) {
        console.log(`Cache hit: ${key}`);
        return res.json(JSON.parse(cached));
      }
      const originalJson = res.json.bind(res);
      res.json = async (data) => {
        await redis.setex(key, duration, JSON.stringify(data));
        return originalJson(data);
      };
      next();
    } catch (error) {
      console.error("Cache error:", error);
      next();
    }
  };

const clearCache = async (pattern = "cache:/api/products*") => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(...keys);
    console.log(`Cleared cache: ${pattern}`);
  } catch (error) {
    console.error("Clear cache error:", error);
  }
};

module.exports = { redis, cacheMiddleware, clearCache };
