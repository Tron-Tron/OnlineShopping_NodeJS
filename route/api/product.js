const express = require("express");
const productController = require("../../controllers/productController");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("ok");
});

router
  .route("/")
  .post(productController.createNewProduct)
  .get(productController.getAllProducts);

router.get("/:productId", productController.getProductById);
router.delete("/:productId", productController.deleteProductById);
router.patch("/:productId", productController.updateProductById);

module.exports = router;
