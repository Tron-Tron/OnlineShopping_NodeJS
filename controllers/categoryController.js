const Category = require("../database/models/Category");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const SuccessResponse = require("../model/SuccessResponse");

exports.createNewCategory = asyncMiddleware(async (req, res, next) => {
  const { category_id, category_name } = req.body;

  const newCategory = new Category({ category_id, category_name });
  const saved_Category = await newCategory.save();
  res.status(201).json(new SuccessResponse(201, saved_Category));
});
exports.getAllCategories = asyncMiddleware(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json(new SuccessResponse(200, categories));
});
exports.deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { category_id } = req.params;
  if (!category_id.trim()) {
    return next(new ErrorRespone(400, "category_id is empty"));
  }
  const deletedCategory = await Category.findByIdAndDelete(category_id);
  if (!deletedCategory) {
    return next(new ErrorRespone(400, "Can not delete"));
  }
  res.status(200).json(new SuccessResponse(200, "Successfully!"));
});
exports.updateCategoryById = asyncMiddleware(async (req, res, next) => {
  const { category_id } = req.params;

  if (!category_id.trim()) {
    return next(new ErrorRespone(400, "category_id is empty"));
  }

  const updatedCategory = await Category.findOneAndUpdate(
    { _id: category_id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedCategory) {
    return next(new ErrorRespone(400, "Can not Update"));
  }
  res.status(200).json(new SuccessResponse(200, updatedCategory));
});
