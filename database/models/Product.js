const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    product_id: {
      type: String,
      unique: true,
      required: [true, "product_id is required"],
    },
    product_name: {
      type: String,
      required: [true, "role_name is required"],
    },
    image: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    price: {
      type: Number,

      required: [true, "price is required"],
    },
    category: {
      type: String,

      required: [true, "category is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
ProductSchema.virtual("category_detail", {
  ref: "Category", //from
  localField: "category",
  foreignField: "category_id",
  justOne: true,
  // options: {
  //   $project: { "role_detail.role_name": 1, role_desc: 1 },
  // },
});
module.exports = mongoose.model("Product", ProductSchema);
