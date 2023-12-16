const Product = require('../models/product')
const Video = require('../models/advideo')
const axios = require('axios')

// send all uploaded product
const findProducts = async (req, res) => {
    try{
        const products = await Product.find()
        if(products !== null){
            res.json({ foundproducts: products })
        }else{
            res.json({ foundproducts: products })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// send product with specified slug
const findProductWithSlug = async (req, res) => {
    try{

        // using slug to get id of the product
        let slug = req.body.slug
        console.log('sent data', slug)

        let getId = await Product.findOne({ slug: req.body.slug })

        console.log('data found', getid)
        if(getId !== null){

            // using slug without number attached to get 10 similar product
            slug = slug.split('-')
            slug.pop()
            newSlug = ''
            for(let i = 0; i < slug.length; i++){
                newSlug += slug[i]

                if(i != slug.length -1 ){ 
                    newSlug += '-'
                }
            }
            console.log('new slug', newSlug)

            // send request to vendor app to get vendors that imported this product 
            let response = await axios.post('https://vendors-jpnc.onrender.com/users/productsid', {
                id: getId._id
            })

            // get affiliate links
            const affiliate = getId.affiliate

            // get top 10 similar product
            const similarProducts = await Product.find({
                name: { $regex: new RegExp(newSlug, 'i') },
              }).limit(10);

            // get 3 similar video
            const similarVideos = await Video.find({
                title: { $regex: new RegExp(newSlug, 'i') },
              }).limit(3);

            let sendData = {
                vendors: response.data.vendors,
                affiliate: affiliate,
                similarProducts: similarProducts,
                similarVideos, similarVideos
            }

            res.json({ data: sendData })
        }else{
            let sendData = { }
            res.json({ data: sendData })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}




// send top 8 uploaded product
const topproducts = async (req, res) => {
    try{
        const products = await Product.find().sort({ countperimport: -1 }).limit(8)
        if(products !== null){
            res.json({ foundproducts: products })
        }else{
            res.json({ foundproducts: products })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// send top 8 uploaded product
const findVideo = async (req, res) => {
    try{
        const videos = await Video.find().sort({ createdAt: -1 })
        if(videos !== null){
            res.json({ foundvideos: videos })
        }else{
            res.json({ foundvideos: videos })
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// get and send all vendor imported products back to vendor route for users to access
const vendorProducts = async (req, res) => {
    try{
        let productData = req.body.data
        let productDetails = []
        
        const products =  Product.findOne()

        productData.forEach(data => {
            for(let x = 0; x < products.length; x++){
                if(data.productid === products[x]._id){
                    productDetails.push(products[x])
                }
            }
        });

        res.json({ foundproducts: productDetails })
        
    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



module.exports = {
    findVideo,
    topproducts,
    findProducts,
    findProductWithSlug,
    vendorProducts,
}
