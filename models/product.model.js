const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {},
  {
    versionKey: false,
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
