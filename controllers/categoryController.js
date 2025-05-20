const Category = require('../models/categoryModel')

createCategory = async(req,res)=>{
    try {
      if(!req.user.isAdmin){
      res.status(401).send({message:"Not Authorized"})
    }
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(200).send({ message: "Category Created Successfully", success: true });
    } catch (error) {
        res.status(500).send({ error: error });
    }

}


getAllCategories = async(req,res)=>{
   try {
    categories = await Category.findAll()
        res.status(200).send({ success: true , categories: categories});
    } catch (error) {
        res.status(500).send({ error: error });
    }

}
 

const getCategoryByID = async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });

    if (!category) {
      res.status(404).send({ error: "Category not found" });
    } else {
      res.status(200).send({ message: "Category found successfully", success: true });
    }

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    if(!req.user.isAdmin){
      res.status(401).send({message:"Not Authorized"})
    }
    const { id } = req.params;
    const { name } = req.body;

    const [updated] = await Category.update({ name }, { where: { id } });

    if (updated) {
      res.status(200).send({ message: "Category updated successfully", success: true });
    } else {
      res.status(404).send({ error: "Category not found", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    if(!req.user.isAdmin){
      res.status(401).send({message:"Not Authorized"})
    }
    const { id } = req.params;

    const deleted = await Category.destroy({ where: { id } });

    if (deleted) {
      res.status(200).send({ message: "Category deleted successfully", success: true });
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
    deleteCategory
}