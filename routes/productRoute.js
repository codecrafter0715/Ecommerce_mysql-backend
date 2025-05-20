const express = require('express')
const productController = require ("../controllers/productController")
const authmiddleware = require('../middleware/auth')
const router = express.Router();


router.post('/create',authmiddleware.auth,productController.createProduct)
router.get('/getAllProducts',productController.getAllProducts)
router.get('/getProductByID/:id',productController.getProductByID)
router.put('/updateProduct/:id',authmiddleware.auth,productController.updateProduct)
router.delete('/deleteProduct/:id',authmiddleware.auth,productController.deleteProduct)



module.exports = router;