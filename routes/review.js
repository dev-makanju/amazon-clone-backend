const router = require("express").Router();
const Review = require("../models/review");
const Product = require("../models/product");
const verifyToken = require('../middlewares/verify-token')
const upload = require("../middlewares/upload-photo")

router.post("/reviews/:productID" , [verifyToken , upload.single("photo")] , async ( req , res) => {
    try{   
        const review = new Review();
        review.headline = req.body.headline
        review.body = req.body.body
        review.rating = req.body.rating
        review.photo = req.file.location;
        review.user = req.decoded._id
        review.productID = req.params.productID


        await Product.update({ $push: {review: review._id} });

        const saveReview = await review.save();

        if(saveReview) {
            res.json({
                 success:true,
                 message:"Successfully Added Review"
            });
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: "An error occured while creating review"
        });
    }
});

//this get route is private 
//require a verify token

router.get("/reviews/:productID" , verifyToken , async ( req , res) => {
    try{   
        const productReviews = await Review.find({ productID: req.params.productID })
        .populate("user")
        .exec();

        res.json({
            success: true,
            reviews: productReviews
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        });
    }
});

module.exports = router;