const express = require("express");
const roleController = require("../../controllers/roleController");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("ok");
});

router
  .route("/")
  .post(roleController.createNewRole)
  .get(roleController.getAllRoles);

router.delete("/:roleId", roleController.deleteRoleById);

//Update
router.patch("/:roleId", roleController.updateRoleById);

module.exports = router;
