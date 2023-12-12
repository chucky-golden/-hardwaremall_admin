const axios = require('axios')
const Product = require('../models/product')

// block vendor account
const editVendor = async (req, res) => {
    try{
        let uid = req.body.admin_id

        if(req.session.admin._id == uid){ 
            const vendorid = req.body.vendor_id
            const action = req.body.action

            if(action == null || action == ''){
                let edit = await axios.post('https://vendors-jpnc.onrender.com/giveData/data', {
                    vendorid: vendorid
                })
                if(response !== null) {
                    res.json({ message: response.data.message })
                }
                else {
                    res.json({ message: 'error processing request' })
                }
            }
            
            else if(action != null || action != ''){
                let edit = await axios.post('https://vendors-jpnc.onrender.com/giveData/editdata', {
                    vendorid: vendorid,
                    action: action
                })
                if(response !== null) {
                    res.json({ message: response.data.message })
                }
                else {
                    res.json({ message: 'error processing request' })
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




const getProducts = async (req, res) => {
    try{
        let productids = req.body.products
        let foundProducts = []

        let products = await Product.find({})

        if(products !== null){
            products.forEach(product => {
                for(let x = 0; x < productids.length; x++){
                    if(product._id === productids[x].productid){
                        foundProducts.push(product)
                    }
                }
            })
            
            res.json({ foundProducts: foundProducts })
        }else{
            res.json({ foundProducts: foundProducts })
        }


    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}

module.exports = {
    editVendor,
    getProducts
}
