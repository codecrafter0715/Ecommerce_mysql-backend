const express = require('express')
const CategoryController = require ("../controllers/categoryController")
const authmiddleware = require('../middleware/auth')
const multerMiddleware = require('../middleware/multer')
const router = express.Router();


router.post('/create',authmiddleware.auth,multerMiddleware.single('image'),CategoryController.createCategory);
router.get('/getAllCategories',CategoryController.getAllCategories)
router.get('/getCategoryByID/:id',CategoryController.getCategoryByID)
router.put('/updateCategory/:id',authmiddleware.auth,CategoryController.updateCategory)
router.delete('/deleteCategory/:id',authmiddleware.auth,CategoryController.deleteCategory)



module.exports = router;



