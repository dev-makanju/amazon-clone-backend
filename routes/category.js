const router = require("express").Router();
const Cartigory = require("../models/category");

//POST request to this route
router.post("/cartigories" , async ( req , res) => {
    try{  
        let cartigory = new Cartigory();
        cartigory.type = req.body.type

        await cartigory.save();

        res.json({
            status: true,
            message: "cartigory created successfully"
        });

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
});

// GET request to this route
router.get("/cartigories" , async ( req , res) => {
    try{  
        let cartigories = await Cartigory.find();
        res.json({
            success: true,
            categories: cartigories
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        })
    }
});

module.exports = router;

