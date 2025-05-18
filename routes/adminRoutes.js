const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/products', async (req, res) => {
  try {
    const { name, price, image, condition, category } = req.body;
    if (!name || !price || !image || !condition || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const product = new Product({
      name,
      price: Number(price),   // convert to Number if needed
      image,
      condition,
      category
    });

    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product", error });
  }
});

module.exports = router;
