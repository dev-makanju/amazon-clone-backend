const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken")

/**
 * @route POST api/users
 * @desc Register a new user
 * @access Public
*/
router.post("/users/signup" , async (req , res) => { 
    if(! req.body.email  || !req.body.password ) 
    {
         res.json({
             status: false, 
             message: "kindly input the required feild"
         });
    }else{
        try{
           let user = new User();
    
           user.name = req.body.name,
           user.email = req.body.email,
           user.password = req.body.password;

           await user.save()
           let token = jwt.sign(user.toJSON() , process.env.SECRET , {
                expiresIn: 604800 //1 week
           });

           res.json({
                success: true,
                token:token, 
                message: "Successfully created a new user"
           })
        }catch(err){
             console.log(err)
        }
    }
});

module.exports = router;