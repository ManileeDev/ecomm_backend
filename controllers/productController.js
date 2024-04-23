const ProductModel = require("../model/productModel");

//GET Products API - /api/products
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({
      status: "Success",
      products,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
};

//GET Single Product - /api/product/:id
const getSingleProduct = async (req, res) => {
  const prod = req.params.id;
  try {
    const product = await ProductModel.findById({_id : prod});
    res.json({
      status: "Success",
      product,
    });
  } catch (err) {
    res.json({message: err.message});
  }
};

module.exports = { getProducts , getSingleProduct};
