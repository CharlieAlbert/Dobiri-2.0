const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    img1: String,
    title: String,
    price: Number,
    strike: String,
    category: String,
    maincategory: String,
    stocks: Number,
    img2: String,
  },
  {
    timestamps: true, // Add timestamps (createdAt and updatedAt)
  }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
