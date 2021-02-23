const mongoose = require("mongoose");

const { Schema } = mongoose;

const CustomerSchema = new Schema(
  {
    customer_id: {
      type: String,
      unique: true,
      required: [true, "customer_id is required"],
    },
    customer_name: {
      type: String,
      required: [true, "customer_name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: Number,
      required: [true, "phone is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
