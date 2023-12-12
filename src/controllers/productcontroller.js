const Product = require('../models/product')
const Video = require('../models/advideo')
const Affiliate = require('../models/affiliate')
const cloudinary = require('../middlewares/cloudinary')


// upload products
const createProduct = async (req, res) => {
    try{
        console.log('data',req.body)
        
        let uid = req.body.admin_id

        if(req.session.admin._id == uid){ 

            const result = await cloudinary.uploader.upload(req.file.path)

            let slug = Math.floor(Math.random() * Date.now()).toString(16)
            slug = slug + '-' + req.body.name

            if (req.file == undefined) {
                res.json({ message: 'please upload an image' })
            }

            let info = {
                img: result.secure_url,
                cloudinaryid: result.public_id,
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                tags: req.body.tags,
                countperimport: '0',
                slug: slug,
                affiliate: req.body.affiliate,
            }

            const product = await new Product(info).save()
            if(product !== null){
                res.json({ message: 'product uploaded' })
            }else{
                res.json({ message: 'error uploading product' })
            }
        }else{
            res.json({ message: 'unauthorised access' })
        }
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// add video links
const createVideo = async (req, res) => {
    try{
        let uid = req.body.admin_id

        if(req.session.admin._id == uid){ 
        
            let info = {
                title: req.body.title,
                url: req.body.url,
            }

            const video = await new Video(info).save()
            if(video !== null){
                res.json({ message: 'video link uploaded' })
            }else{
                res.json({ message: 'error uploading video link' })
            }
        }else{
            res.json({ message: 'unauthorised access' })
        }
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// add affiliate link
const createAffiliate = async (req, res) => {
    try{
        let uid = req.body.admin_id

        if(req.session.admin._id == uid){ 
        
            let info = {
                title: req.body.title,
                url: req.body.url,
            }

            const video = await new Affiliate(info).save()
            if(video !== null){
                res.json({ message: 'affiliate link uploaded' })
            }else{
                res.json({ message: 'error uploading affiliate link' })
            }
        }else{
            res.json({ message: 'unauthorised access' })
        }
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch affiliate
const viewAffiliate = async (req, res) => {
    try{

        let response = await Affiliate.find().sort({ createdAt: -1 })
        if(response !== null){
            res.json({ affiliate: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch video
const viewVideo = async (req, res) => {
    try{

        let response = await Video.find().sort({ createdAt: -1 })
        if(response !== null){
            res.json({ video: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// fetch product
const viewProduct = async (req, res) => {
    try{

        let response = await Product.find().sort({ createdAt: -1 })
        if(response !== null){
            res.json({ products: response })
        }
        else {
            res.json({ message: 'error handling request' })
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// delete affiliate
const deleteAff = async (req, res) => {
    try{
        let uid = req.body.admin_id

        if(req.session.admin._id == uid){

            const affiliateid = req.body.affiliate-id

            const result = await Affiliate.findByIdAndDelete(affiliateid)

            if(result !== null){
                res.json({ message: 'affiliate link deleted' })
            }else{
                res.json({ message: 'error deleting link' })
            }

        }else{
            res.json({ message: 'unauthorised access' })
        }   

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// delete video
const deleteVideo = async (req, res) => {
    try{
        let uid = req.body.admin_id

        if(req.session.admin._id == uid){

            const videoid = req.body.video-id

            const result = await Video.findByIdAndDelete(videoid)

            if(result !== null){
                res.json({ message: 'video link deleted' })
            }else{
                res.json({ message: 'error deleting video link' })
            }

        }else{
            res.json({ message: 'unauthorised access' })
        }   

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// editing products
const editProduct = async (req, res) => {
    try{
        let uid = req.body.admin_id

        if(req.session.admin._id == uid){

            const productid = req.body.product_id

            let slug = Math.floor(Math.random() * Date.now()).toString(16)
            slug = slug + '-' + req.body.name

                
            if (req.file == undefined) {
                const product = await Product.updateOne({ _id: productid }, 
                    {
                        $set:{
                            name: req.body.name,
                            description: req.body.description,
                            category: req.body.category,
                            tags: req.body.tags,
                            slug: slug,
                            affiliate: req.body.affiliate,
                        }
                    }
                )
                if(product !== null){
                    res.json({ message: 'product updated' })
                }else{
                    res.json({ message: 'error updating product' })
                }
            }else{
                const product = await Product.updateOne({ _id: productid }, 
                    {
                        $set:{

                            img: req.file.filename,
                            name: req.body.name,
                            description: req.body.description,
                            category: req.body.category,
                            tags: req.body.tags,
                            slug: slug,
                            affiliate: req.body.affiliate,
                        }
                    }
                )
                if(product !== null){
                    res.json({ message: 'product updated' })
                }else{
                    res.json({ message: 'error updating product' })
                }
            }

            
        }else{
            res.json({ message: 'unauthorised access' }) 
        }  
       

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}





// deleting products
const deleteProduct = async (req, res) => {
    try{
        let uid = req.body.admin_id

        if(req.session.admin._id == uid){

            const productid = req.body.product_id

            const product = await Product.findByIdAndDelete(productid)

            if(product !== null){
                res.json({ message: 'product deleted' })
            }else{
                res.json({ message: 'error deleting product' })
            }

            
        }else{
            res.json({ message: 'unauthorised access' }) 
        }  
       

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


module.exports = {
    createProduct,
    createVideo,
    editProduct,
    createAffiliate,
    viewAffiliate,
    viewVideo,
    viewProduct,
    deleteAff,
    deleteVideo,
    deleteProduct,
}