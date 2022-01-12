const router = require("express").Router();
const Owner = require("../models/owner");
const upload = require("../middlewares/upload-photo");


//POST request
router.post("/owners" , upload.single("photo") , async ( req , res) => {
    try{
        let owner = new Owner();
        owner.name = req.body.name,
        owner.about = req.body.about,
        owner.photo = req.file.location
       // owner.photo = req.body.photo,

        await owner.save();
        res.json({
            status: true,
            message:"Owner successfully created"
        });
    }catch(err){
        res.status(500).json({
            message: err.message,
        });
    }
});

//GET owners
router.get("/owners" , async ( req , res) => {
    try{
        let owners = await Owner.find();
        res.json({
            status:true,
            owners:owners
        });
    }catch(err){
        res.status(500).json({
            messgae: err.message,     
        });
    }
})

module.exports = router;
