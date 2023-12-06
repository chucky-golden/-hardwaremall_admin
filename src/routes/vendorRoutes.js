const router = require('express').Router()
const vendorController = require('../controllers/vendorController')


router.post('/edit', vendorController.editVendor)

// request coming from the vendors service to get vendors products
router.get('/getvendorproducts', vendorController.getProducts)


module.exports = router