const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
mongoose.set("runValidators", true);
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      minlength: [6, "Name must have more than 6 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      // enum: ["admin", "guest", "teacher", "support"], //chi cho phep gia tri trong enum
      required: true,
      default: "guest", //guest
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

UserSchema.virtual("role_detail", {
  ref: "Role", //from
  localField: "role",
  foreignField: "role_name",
  justOne: true,
  // options: {
  //   $project: { "role_detail.role_name": 1, role_desc: 1 },
  // },
});
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  // const hashedPassword = await bcrypt.hash(this.password, salt);
  // this.password = hashedPassword;
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// hien tai chua can update password, bua sau a chi update password
// e viet code sai nhieu qua, buon

// UserSchema.pre("findOneAndUpdate", async function () {
//   const salt = await bcrypt.genSalt(12);
//   this._update.password = await bcrypt.hash(this._update.password, salt); // ????????????????
// });

UserSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const users = this;
  const token = jwt.sign({ _id: users._id }, process.env.JWT_KEY);
  user.tokens = users.tokens.concat({ token });
  await users.save();
  return token;
};

// ko viet arrow function
UserSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
module.exports = mongoose.model("User", UserSchema);
