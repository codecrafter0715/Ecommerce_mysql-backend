const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  console.log(req.body);
  console.log(req.user.isAdmin, "Is admin ");
  const { name } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    if (!req.user.isAdmin) {
      res.status(401).send({ message: "Not Authorized" });
    } else {
      const existingCategory = await Category.findOne({ where: { name } });
      console.log(existingCategory, "existingCategory");
      if (existingCategory) {
        res.status(200).send({ message: "Category Already exist" });
      } else {
        const newCategory = await Category.create({ name, image });
        res
          .status(200)
          .send({ message: "Category Created Successfully", success: true });
      }
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    const modifiedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      image: `http://localhost:7000/uploads/${category.image}`,
    }));

    res.status(200).send({ success: true, categories: modifiedCategories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send({ error: error.message });
  }
};

const getCategoryByID = async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });

    if (!category) {
      res.status(404).send({ error: "Category not found" });
    } else {
      res.status(200).send({ message: "Category found successfully", success: true, category });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).send({ message: "Not Authorized" });
    }
    const { id } = req.params;
    const { name } = req.body;

    const [updated] = await Category.update({ name }, { where: { id } });

    if (updated) {
      res
        .status(200)
        .send({ message: "Category updated successfully", success: true });
    } else {
      res.status(404).send({ error: "Category not found", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).send({ message: "Not Authorized" });
    }
    const { id } = req.params;

    const deleted = await Category.destroy({ where: { id } });

    if (deleted) {
      res
        .status(200)
        .send({ message: "Category deleted successfully", success: true });
    } else {
      res.status(404).send({ error: "Category not found", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByID,
  updateCategory,
  deleteCategory,
};
