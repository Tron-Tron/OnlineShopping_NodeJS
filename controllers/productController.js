const Product = require("../database/models/Product");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const SuccessResponse = require("../model/SuccessResponse");

exports.createNewProduct = asyncMiddleware(async (req, res, next) => {
  const { product_id, product_name, image, amount, price, category } = req.body;
  const newProduct = new Product({
    product_id,
    product_name,
    image,
    amount,
    price,
    category,
  });
  const saved_product = await newProduct.save();
  res.status(201).json(new SuccessResponse(201, saved_product));
});
exports.getProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId.trim()) {
    return next(new ErrorRespone(400, "productId is empty"));
  }
  const product = await Product.findById(productId).catch((err) => {
    return next(new ErrorRespone(404, "Product is not found"));
  });
  if (product) {
    res.status(200).json(new SuccessResponse(200, product));
  }
});
exports.getAllProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find().populate({
    path: "category_detail",
    select: { category_id: 1, category_name: 1 },
  });
  res.status(200).json(new SuccessResponse(200, products));
});
exports.deleteProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId.trim()) {
    return next(new ErrorRespone(400, "productId is empty"));
  }
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    return next(new ErrorRespone(400, "Can not delete"));
  }
  res.status(200).json(new SuccessResponse(200, "Successfully!"));
});
exports.updateProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId.trim()) {
    return next(new ErrorRespone(400, "productId is empty"));
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedProduct) {
    return next(new ErrorRespone(400, "Can not Update"));
  }
  res.status(200).json(new SuccessResponse(200, updatedProduct));
});
