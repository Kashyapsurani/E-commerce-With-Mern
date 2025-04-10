const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  showCategoryForm,
  createCategory,
  editCategoryForm,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { requireAuth, checkRole } = require("../middleware/authMiddleware");

router.get("/", getAllCategories);

router.get("/new", requireAuth, checkRole("admin"), showCategoryForm);
router.post("/new", requireAuth, checkRole("admin"), createCategory);

router.get("/edit/:id", requireAuth, checkRole("admin"), editCategoryForm);
router.post("/edit/:id", requireAuth, checkRole("admin"), updateCategory);

router.post("/delete/:id", requireAuth, checkRole("admin"), deleteCategory);

module.exports = router;
