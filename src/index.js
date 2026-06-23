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