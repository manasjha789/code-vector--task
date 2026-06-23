const pool = require("../db");

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Toys",
  "Home",
  "Beauty",
];

async function seed() {
  const totalRecords = 200000;
  const batchSize = 1000; // safe for PostgreSQL parameter limit

  for (let start = 0; start < totalRecords; start += batchSize) {
    const values = [];
    const placeholders = [];

    for (let i = 0; i < batchSize && start + i < totalRecords; i++) {
      const productNo = start + i;

      placeholders.push(
        `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`
      );

      values.push(
        `Product ${productNo}`,
        categories[Math.floor(Math.random() * categories.length)],
        Math.floor(Math.random() * 10000) + 1,
        new Date(Date.now() - productNo * 1000),
        new Date(Date.now() - productNo * 1000)
      );
    }

    await pool.query(
      `
      INSERT INTO products
      (name, category, price, created_at, updated_at)
      VALUES ${placeholders.join(",")}
      `,
      values
    );

    console.log(`Inserted ${Math.min(start + batchSize, totalRecords)} records`);
  }

  console.log("✅ Seeding completed");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});