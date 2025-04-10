const Category = require("../models/Category");

// GET: All categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("categoryList", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET: Show form to add new category
exports.showCategoryForm = (req, res) => {
  res.render("categoryForm", { category: null });
};

// POST: Create category
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  // Simple validation
  if (!name) {
    return res.status(400).send("Category name is required");
  }

  try {
    await Category.create({ name });
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET: Show form to edit category
exports.editCategoryForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("categoryForm", { category });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// POST: Update category
exports.updateCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Category name is required");
  }

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { name });

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// POST: Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
