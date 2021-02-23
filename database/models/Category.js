const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    category_id: {
      type: String,
      unique: true,
      required: [true, "category_id is required"],
    },
    category_name: {
      type: String,
      required: [true, "category_name is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
