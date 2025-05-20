const express = require('express')
const brandController = require ("../controllers/brandController")
const authmiddleware = require('../middleware/auth')

const router = express.Router();


router.post('/create',authmiddleware.auth,brandController.createBrand)
router.get('/getAllBrands',brandController.getAllBrands)
router.get('/getBrandByID/:id',brandController.getBrandByID)
router.put('/updateBrand/:id',authmiddleware.auth,brandController.updateBrand)
router.delete('/deleteBrand/:id',authmiddleware.auth,brandController.deleteBrand)



module.exports = router;