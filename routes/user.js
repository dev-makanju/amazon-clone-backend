const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const verifyToken = require("../middlewares/verify-token")

/**
 * @route POST api/users
 * @desc Register a new user
 * @access Public
*/
router.post("/auth/signup" , async (req , res) => { 
    if(!req.body.email  || !req.body.password ) 
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


/**
 * @route GET users/profile   
 * @access Private
 * @desc get req to profilepage
*/

router.get("/auth/user" , verifyToken ,  async ( req , res) => {
     try{
          let foundUser = await User.findOne({_id: req.decoded._id});
          if(foundUser){
               res.json({
                    success:true,
                    user: foundUser
               });
          }
     }catch(err){
          res.status(500).json({
              success: false,
              message: err.nessage
          });
     }
})

/**
 * @route POST users/login
 * @access public
 * @desc  login registered user
*/

router.post("/auth/login" , async(req , res) => {
     try{
          let foundUser = await User.findOne({email: req.body.email});
          console.log(req.body)
          if(!foundUser){
               res.status(403).json({
                   success: false,
                   message: "Authentication , Oops failed user not found"
               });
          }else{
               if(foundUser.comparePassword(req.body.password)){ 
                   let token = jwt.sign(foundUser.toJSON() , process.env.SECRET , {
                        expiresIn : 604800 //1 week
                   });

                   res.json({
                        success: true,
                        token: token
                   });
               }else{
                    res.status(403).json({
                         success: false,
                         message: "Authentication failed" 
                    });
               }
          }
     }catch(err){
          console.log(err)
     }
})



module.exports = router;      