const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

// const { connectDB } = require("./database/connectDB");
const { ConnectMongo } = require("./database/connectMongo");

const app = express();
const auth = require("./route/api/auth");
const user = require("./route/api/user");
const role = require("./route/api/role");
const category = require("./route/api/category");
const customer = require("./route/api/customer");

const PORT = 5000;
const { errorMiddleware } = require("./middleware/errorMiddleware");

const cors = require("cors");
const { baseAuth } = require("./middleware/baseAuth");

//config env

//middleware parse body
app.use(express.json());
app.use(cors());
console.log(process.env.JWT_KEY);
ConnectMongo.getConnect();

//Using mongoDB
//route
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/role", role);
app.use("/api/v1/category", category);
app.use("/api/v1/customer", customer);
app.get("/test", baseAuth);
//viet duoi route
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
