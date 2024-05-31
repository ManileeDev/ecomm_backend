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
    const product = await ProductModel.findById({ _id: prod });
    res.json({
      status: "Success",
      product,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

//Create Product - /api/product/create
const createProduct = async (req, res) => {
  try {
    const { name, price, images, category, seller, stock } = req.body;
    const product = await ProductModel.create({name, price, images, category, seller, stock});
    res.json({
      status: "Success", product
    });
  } catch (err) {
    res.status.json({message : err.message});
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    res.json({
      status: "Product Deleted",
      product,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      status: "Product Updated",
      product,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};
module.exports = { getProducts, getSingleProduct, createProduct ,deleteProduct ,updateProduct };
