const Role = require("../database/models/Role");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const SuccessResponse = require("../model/SuccessResponse");

exports.createNewRole = asyncMiddleware(async (req, res, next) => {
  const { role_id, role_name } = req.body;

  const newRole = new Role({ role_id, role_name });
  const saved_role = await newRole.save();
  res.status(201).json(new SuccessResponse(201, saved_role));
});
exports.getAllRoles = asyncMiddleware(async (req, res, next) => {
  const roles = await Role.find();
  res.status(200).json(new SuccessResponse(200, roles));
});
exports.deleteRoleById = asyncMiddleware(async (req, res, next) => {
  const { roleId } = req.params;
  if (!roleId.trim()) {
    return next(new ErrorRespone(400, "RoleId is empty"));
  }
  const deletedRole = await Role.findByIdAndDelete(roleId);
  if (!deletedRole) {
    return next(new ErrorRespone(400, "Can not delete this role"));
  }
  res.status(200).json(new SuccessResponse(200, "Delete Successfully!"));
});
exports.updateRoleById = asyncMiddleware(async (req, res, next) => {
  const { roleId } = req.params;

  if (!roleId.trim()) {
    return next(new ErrorRespone(400, "roleId is empty"));
  }

  const updatedRole = await Role.findOneAndUpdate({ _id: roleId }, req.body, {
    new: true,
  });
  if (!updatedRole) {
    return next(new ErrorRespone(400, "Can not Update"));
  }
  res.status(200).json(new SuccessResponse(200, updatedRole));
});
