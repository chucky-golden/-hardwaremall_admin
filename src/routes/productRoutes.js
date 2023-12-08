const router = require('express').Router()
const productcontroller = require('../controllers/productcontroller')
const upload = require("../middlewares/uploads");

router.post('/create', upload.single("img"), productcontroller.createProduct)
router.post('/addvideo', productcontroller.createVideo)
router.post('/addaffiliate', productcontroller.createAffiliate)
router.post('/edit', upload.single("img"), productcontroller.editProduct)
router.post('/delete', productcontroller.deleteProduct)


router.post('/deleteaff', productcontroller.deleteAff)
router.post('/deletevideo', productcontroller.deleteVideo)



// get routes
router.get('/getaffiliate', productcontroller.viewAffiliate)



module.exports = router