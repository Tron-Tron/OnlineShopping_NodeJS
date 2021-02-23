const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    role_id: {
      type: String,
      unique: true,
      required: [true, "role_id is required"],
    },
    role_name: {
      type: String,
      required: [true, "role_name is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Role", RoleSchema);
