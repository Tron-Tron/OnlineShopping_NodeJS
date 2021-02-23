const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    bill_id: {
      type: String,
      unique: true,
      required: [true, "product_id is required"],
    },
    sku: {
      type: String,
      required: [true, "sku is required"],
    },
    number: {
      type: Number,
      required: [true, "number is required"],
    },
    product_price: {
      type: Number,
      required: [true, "product_price is required"],
    },
    discount: {
      type: Number,
      required: [true, "discount is required"],
    },
    total_price: {
      type: Number,
      required: [true, "total_price is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
