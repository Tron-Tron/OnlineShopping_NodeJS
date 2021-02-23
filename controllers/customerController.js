const Customer = require("../database/models/Customer");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const SuccessResponse = require("../model/SuccessResponse");

exports.createNewCustomer = asyncMiddleware(async (req, res, next) => {
  const { customer_id, customer_name, email, address, phone } = req.body;

  const newCustomer = new Customer({
    customer_id,
    customer_name,
    email,
    address,
    phone,
  });
  const saved_customer = await newCustomer.save();
  res.status(201).json(new SuccessResponse(201, saved_customer));
});
exports.getAllCustomers = asyncMiddleware(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json(new SuccessResponse(200, customers));
});
exports.deleteCustomerById = asyncMiddleware(async (req, res, next) => {
  const { customer_id } = req.params;
  if (!customer_id.trim()) {
    return next(new ErrorRespone(400, "customer_id is empty"));
  }
  const deletedCustomer = await Customer.findByIdAndDelete(customer_id);
  if (!deletedCustomer) {
    return next(new ErrorRespone(400, "Can not delete"));
  }
  res.status(200).json(new SuccessResponse(200, "Successfully!"));
});
exports.updateCustomerById = asyncMiddleware(async (req, res, next) => {
  const { customer_id } = req.params;

  if (!customer_id.trim()) {
    return next(new ErrorRespone(400, "customer_id is empty"));
  }

  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: customer_id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedCustomer) {
    return next(new ErrorRespone(400, "Can not Update"));
  }
  res.status(200).json(new SuccessResponse(200, updatedCustomer));
});
