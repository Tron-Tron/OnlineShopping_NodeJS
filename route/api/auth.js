const express = require("express");
const route = express.Router();
const authController = require("../../controllers/authController");
const { baseAuth } = require("../../middleware/baseAuth");

route.post("/register", authController.register);
route.post("/login", baseAuth, authController.login);

module.exports = route;
