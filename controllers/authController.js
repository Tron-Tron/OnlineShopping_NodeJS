const User = require("../database/models/User");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorRespone = require("../model/ErrorResponse");
const jwt = require("jsonwebtoken");
const SuccessResponse = require("../model/SuccessResponse");

exports.register = asyncMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  const saved_user = await newUser.save();
  res.status(201).json(new SuccessResponse(201, saved_user));
});

exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) {
    const isMatchPassword = await User.comparePassword(
      password,
      isExistEmail.password
    );
    if (isMatchPassword) {
      const token = jwt.sign(
        {
          email: isExistEmail.email,
          name: isExistEmail.name,
          role: isExistEmail.role,
        },
        process.env.JWT_KEY //secret key
      );
      console.log(token);
      return res.status(200).json(new SuccessResponse(200, token));
    } else {
      return next(new ErrorRespone(404, "Password is incorrect"));
    }
  } else {
    return next(new ErrorRespone(404, "Email is not found"));
  }
});
