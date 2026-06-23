const express = require("express");
const productsRouter = require("./routes/products");

const app = express();

app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "CodeVector Backend Running",
  });
});

// Products API
app.use("/products", productsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});