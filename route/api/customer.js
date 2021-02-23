const express = require("express");
const customerController = require("../../controllers/customerController");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("ok");
});

router
  .route("/")
  .post(customerController.createNewCustomer)
  .get(customerController.getAllCustomers);

router.delete("/:customerId", customerController.deleteCustomerById);

//Update
router.patch("/:customerId", customerController.updateCustomerById);

module.exports = router;
