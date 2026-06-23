const express = require("express");
const productsRouter = require("./routes/products");

const app = express();

app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.json({
    project: "CodeVector Backend Task",
    totalProducts: 200000,
    endpoints: {
      health: "/",
      products: "/products",
      electronics: "/products?category=Electronics"
    },
    features: [
      "Cursor-based pagination",
      "Category filtering",
      "PostgreSQL (Neon)",
      "200,000 seeded products",
      "Render deployment"
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});