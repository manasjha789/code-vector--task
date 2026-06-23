const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
   const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const category = req.query.category;

    let query = `
      SELECT *
      FROM products
    `;

    const values = [];
    const conditions = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (req.query.cursorCreatedAt && req.query.cursorId) {
      values.push(req.query.cursorCreatedAt);
      values.push(req.query.cursorId);

      conditions.push(`
        (created_at, id) <
        ($${values.length - 1}, $${values.length})
      `);
    }

    if (conditions.length) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    values.push(limit);

    query += `
      ORDER BY created_at DESC, id DESC
      LIMIT $${values.length}
    `;

    const result = await pool.query(query, values);

    const products = result.rows;

    let nextCursor = null;

    if (products.length > 0) {
      const last = products[products.length - 1];

      nextCursor = {
        created_at: last.created_at,
        id: last.id,
      };
    }

    res.json({
      products,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;