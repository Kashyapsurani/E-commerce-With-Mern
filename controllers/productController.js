const Product = require("../models/Product"); // Assuming you have a Product model

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("productList", { products }); // Render a view with the products data
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
};

// Fetch products added by the logged-in user
exports.getMyProducts = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you store user info in req.user
    const products = await Product.find({ owner: userId });
    res.render("myProducts", { products });
  } catch (err) {
    res.status(500).send("Error fetching your products");
  }
};

// Show form for creating a new product
exports.showProductForm = (req, res) => {
  res.render("productForm"); // Render the form view
};

// Handle creating a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      owner: req.user._id,
    });
    await newProduct.save();
    res.redirect("/products"); // Redirect after successful creation
  } catch (err) {
    res.status(500).send("Error creating product");
  }
};

// Show form for editing an existing product
exports.editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("productForm", { product }); // Pass the product data to the form
  } catch (err) {
    res.status(500).send("Error fetching product");
  }
};

// Handle updating an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true }
    );
    res.redirect(`/products/${updatedProduct.id}`); // Redirect to the updated product's page
  } catch (err) {
    res.status(500).send("Error updating product");
  }
};

// Handle deleting a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products"); // Redirect back to the product list after deletion
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
};
