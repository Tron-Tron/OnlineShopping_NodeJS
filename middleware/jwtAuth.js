const User = require("../database/models/User");
const jwt = require("jsonwebtoken");
const ErrorRespone = require("../model/ErrorResponse");

const jwtAuth = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  //phan biet token bearer: kieu token
  console.log(token);
  if (!token) {
    return next(new ErrorRespone(401, "Unauthorized"));
  }

  //kiem tra token
  try {
    //neu verify token thanh cong, tra ve thong tin trong payload
    const payload = jwt.verify(token, process.env.JWT_KEY);
    console.log(payload);
    const user = await User.findOne({ email: payload.email });
    if (user) {
      //tao 1 property trong req
      req.user = payload;
      next();
    } else {
      return next(new ErrorRespone(401, "Unauthorized"));
    }
  } catch (error) {
    return next(new ErrorRespone(401, "Unauthorized"));
  }
};

exports.jwtAuth = jwtAuth;
