const express = require("express");
const categoryController = require("../../controllers/categoryController");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("ok");
});
//cach 1
//Create
// router.post("/", roleController.createNewRole);
// router.get("/", roleController.getAllRoles);

//Cach 2
// router.use(jwtAuth, authorize("admin"));
router
  .route("/")
  .post(categoryController.createNewCategory)
  .get(categoryController.getAllCategories);

router.delete("/:categoryId", categoryController.deleteCategoryById);

//Update
router.patch("/:categoryId", categoryController.updateCategoryById);

module.exports = router;
