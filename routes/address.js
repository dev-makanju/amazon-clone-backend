const router = require("express").Router();
const Address = require("../models/address");
const User = require("../models/user");
const verifyToken = require('../middlewares/verify-token')
const axios = require("axios")

router.post("/address" , verifyToken , async ( req , res) => {
    try{   
    let address = new Address();
        address.user = req.decoded._id,
        address.country = req.body.country,
        address.fullName = req.body.fullName,
        address.streetAddress = req.body.streetAddress,
        address.city = req.body.city,
        address.state = req.body.state,
        address.zipCode = req.body.zipCode,
        address.phoneNumber = req.body.phoneNumber,
        address.delieverInstructions = req.body.delieverInstructions,
        address.securityCode = req.body.securityCode,

        await address.save()
        res.json({
            success: true,
            message: "Address created successfully!!!"
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "An error occured while creating address"
        });
    }
});


//this get route is private 
//require a verify token

router.get("/address" , verifyToken , async ( req , res) => {
    try{   
      let address = await Address.find({ user: req.decoded._id })
      res.json({
         success: true,
         address:address 
      });
    }catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        });
    }
});




router.get("/address/:id" , verifyToken , async ( req , res) => {
    try{   
      let address = await Address.findOne({ _id: req.params.id })
      res.json({
         success: true,
         address:address 
      });
    }catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        });
    }
});

router.put("/address/:id" , verifyToken , async( req , res) => {
    try{
         const foundAddress = await Address.findOne({ _id: req.params._id });
         if(foundAddress){  
            if(req.decoded._id) foundAddress.user = req.decoded._id
            if(req.body.country) foundAddress.country = req.body.country
            if(req.body.fullName) foundAddress.fullName = req.body.fullName
            if(req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress
            if(req.body.city) foundAddress.city = req.body.city
            if(req.body.state) foundAddress.state = req.body.state
            if(req.body.zipCode) foundAddress.zipCode = req.body.zipCode
            if(req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber
            if(req.body.delieverInstructions) foundAddress.delieverInstructions = req.body.delieverInstructions
            if(req.body.securityCode) foundAddress.securityCode = req.body.securityCode

            await foundAddress.save();

            res.json({
                success: true,
                message:"Successfully updated!!!"
            })
         }
     }catch(err){
         res.json({
             success:false,
             message:err.message
         });
    }
});

router.delete("/address/:id" , verifyToken , async( req , res) => {
       try{
            let deleteAdress = await Address.remove({ user: req.decoded._id , _id:req.params.id})
            if(deleteAdress){
                res.json({
                    success:true,
                    message:"Address deleted successfully"
                });
            }
        }catch(err){
            res.json({
                success:false,
                message:err.message
            });
       }
});


router.put("/address/set/default"  , verifyToken , async( req , res) => {
    try{
         const doc = await User.findOneAndUpdate( { _id: req.decoded._id} , {_$set: { address: req.body.id} });
         if(doc){
             res.json({
                 success:true,
                 message:"Successfully set this address as default"
             });
         }
     }catch(err){
         res.json({
             success:false,
             message:err.message
         });
    }
});

router.get("/countries" , async ( req , res) => {
    try{
        let response = await axios.get("https://restcountries.com/v3.1/all");
        res.json(response.data);
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//get list of country
//we are using backend beacuase this api does not have cors policy

module.exports = router;