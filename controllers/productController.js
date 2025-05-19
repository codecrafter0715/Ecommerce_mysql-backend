const Product = require('../models/productModel')


createProduct = async(req,res)=>{
    try {
       const newProd = await Product.create(req.body)
        res.status(200).send({message:"Product added successfully",success:true})
    } catch (error) {
        res.status(500).send({error:error})
    }

}


getAllProducts = async(req,res)=>{
    try {
        const products = await Product.findAll();
        res.status(200).send({products:products,success:true})
    } catch (error) {
        res.status(500).send({error:error})
    }
}


const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).send({ message: "Product not found", success: false });
    }

    res.status(200).send({ product, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const [updated] = await Product.update(
      { name, price, description },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).send({ message: "Product not found", success: false });
    }

    res.status(200).send({ message: "Product updated successfully", success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.destroy({ where: { id } });

    if (deleted) {
      res.status(200).send({ message: "Product deleted successfully", success: true });
    } else {
      res.status(404).send({ message: "Product not found", success: false });
    }

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


module.exports ={
    createProduct,
    getAllProducts,
    getProductByID,
    updateProduct,
    deleteProduct
}