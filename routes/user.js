const router = require("express").Router();
const User = require("../models/user");

/**
 * @route POST api/users
 * @desc Register a new user
 * @access Public
*/
router.post("/users" , (req , res) => { 
    let user = new User();
    
    user.name = req.body.name,
    user.email = req.body.email,
    user.password = req.body.password;

    user.save(err => {
        if(err){
            res.json(err)
        } else {
            res.status(201).json({
                message:"You created a new account!!"
            });
        }
    })
})

module.exports = router;