const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getMyProducts,
  showProductForm,
  createProduct,
  editProductForm,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);
router.get("/my", requireAuth, getMyProducts);

router.get("/new", requireAuth, showProductForm);
router.post("/new", requireAuth, createProduct);

router.get("/edit/:id", requireAuth, editProductForm);
router.post("/edit/:id", requireAuth, updateProduct);

router.post("/delete/:id", requireAuth, deleteProduct);

module.exports = router;
