const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo")


/**
 * @route POST api/product
 * @desc register products
 * @access Public
 */
router.post("/products" , upload.single("photo") ,  async ( req , res ) => {
    try{
        let product = new Product({    
            ownerID :req.body.ownerID,
            categoryID : req.body.categoryID,
            title:req.body.title,
            description:req.body.description,
            photo:req.file.location,
            price:req.body.price,
            stockquantity:req.body.stockquantity,
        });

        await product.save();

        res.json({
             status: true,
             message: "Succesfully created product"
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}); 

/**
 * @route GET api/product
 * @desc register products
 * @access Public
 */

router.get("/products" , async ( req , res ) => {
    try{
        //added a populate feild to have our fetch all our data from it foreign keys
        let products = await Product.find().populate("owner category").exec();
        res.json({
             status: true,
             products: products
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

/**
 * @route GET api/product/id
 * @desc register products
 * @access Public
 */

router.get("/products/:id" , async ( req , res ) => {
    try{
        let product = await Product.findOne({ _id:req.params.id })
        .populate('owner category')
        .exec();
        res.json({
             status: true,
             product: product
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
/*upload.single("photo") **/
/**
 * @route PUT api/product/id
 * @desc register products
 * @access Public
 */
router.put("/products/:id" , upload.single("photo") ,  async ( req , res ) => {
    try{
         let product = await Product.findOneAndUpdate({ _id:req.params.id} , {
            $set:{
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                description: req.body.description,
                photo: req.file.location,
                stockquantity: req.body.stockquantity,
                owner: req.body.ownerID
            }
        },{
            upsert: true
        });

        res.json({
             status: true,
             message:"Successfully updated",
             updatedProduct: product
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

/**
 * @route DELETE api/product/id
 * @desc register products
 * @access Public
 */
router.delete("/products/:id" , async ( req , res) => {
    try{
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id } )
        if(deletedProduct){
            res.json({
                status: true,
                message: "Successfully deleted"
           });
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})


module.exports = router;