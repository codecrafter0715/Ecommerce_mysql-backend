const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.user, "User Info");

  const { name, price, description, category_id, brand_id, Quantity, Instock } =
    req.body;

  const images = req.files ? req.files.map((file) => file.filename) : [];
  // const image = req.file ? req.file.filename : null;

  try {
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const existingProduct = await Product.findOne({ where: { name } });

    if (existingProduct) {
      return res.status(200).json({ message: "Product Already Exists" });
    }

    const newProduct = await Product.create({
      name,
      price: parseInt(price),
      description,
      category_id: parseInt(category_id),
      brand_id: parseInt(brand_id),
      Quantity: parseInt(Quantity),
      Instock: Instock === "true",
      image: JSON.stringify(images), // this stays in your existing "image" field
    });

    res.status(200).json({
      message: "Product Created Successfully",
      product: newProduct,
      success: true,
    });
  } catch (error) {
    console.error("Error in product creation:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    const modifiedProducts = products.map((product) => {
      let imageList = [];

      try {
        imageList = JSON.parse(product.image);
        if (!Array.isArray(imageList)) {
          // Sometimes JSON might be a string, wrap it in array
          imageList = [imageList];
        }
      } catch (e) {
        // If parsing fails, treat image as a single string image
        imageList = [product.image];
      }

      return {
        id: product.id,
        name: product.name,
        images: imageList.map((img) => `http://localhost:7000/uploads/${img}`),
      };
    });
    // const modifiedProducts = products.map((product) => {
    // const imageList = JSON.parse(product.image);  // Parse the image JSON string

    //   return {
    //     id: product.id,
    //     name: product.name,
    //     images: imageList.map(img => `http://localhost:7000/uploads/${img}`), // Use the parsed list
    //   };
    // });

    res.status(200).send({ products: modifiedProducts, success: true });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).send({ error: error.message });
  }
};

const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      res.status(404).send({ message: "Product not found", success: false });
    }

    res.status(200).send({ product, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).send({ message: "Not Authorized" });
    }
    const { id } = req.params;
    const { name, price, description } = req.body;

    const [updated] = await Product.update(
      { name, price, description },
      { where: { id } }
    );

    if (!updated) {
      return res
        .status(404)
        .send({ message: "Product not found", success: false });
    }

    res
      .status(200)
      .send({ message: "Product updated successfully", success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).send({ message: "Not Authorized" });
    }
    const { id } = req.params;

    const deleted = await Product.destroy({ where: { id } });

    if (deleted) {
      res
        .status(200)
        .send({ message: "Product deleted successfully", success: true });
    } else {
      res.status(404).send({ message: "Product not found", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
};
