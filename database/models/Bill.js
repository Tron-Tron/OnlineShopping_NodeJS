const mongoose = require("mongoose");

const { Schema } = mongoose;

const BillSchema = new Schema(
  {
    bill_id: {
      type: String,
      unique: true,
      required: [true, "product_id is required"],
    },
    total: {
      type: Number,
      required: [true, "total is required"],
    },
    customer: {
      type: String,
      required: [true, "customer is required"],
    },
    products: {
      type: String,
      required: [true, "products is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
BillSchema.virtual("customer_detail", {
  ref: "Customer", //from
  localField: "customer",
  foreignField: "customer_id",
  justOne: true,
  // options: {
  //   $project: { "role_detail.role_name": 1, role_desc: 1 },
  // },
});
module.exports = mongoose.model("Bill", BillSchema);
