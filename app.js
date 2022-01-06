const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
//initialise app
const app = express();

/////MIDDLEWARES
//for cors policies
app.use(cors());
//morgan for displaying all the req in terminal
app.use(morgan("dev"));
//for parsing all the req and res data in the right format
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const productRoute = require("./routes/product")
const cartigoryRoute = require("./routes/category")
const ownerRoute = require("./routes/owner")
const userRoute = require("./routes/user")


app.use("/api" , productRoute);
app.use("/api" , cartigoryRoute);
app.use("/api" , ownerRoute);
app.use("/api" , userRoute );

mongoose.connect( process.env.DATABASE , {
      useNewUrlParser: true,
}).then( () => {
    console.log("database connected successfully!!!")
}).catch( err => {
    console.log(err)
})



app.get("/" , (req , res ) => {
    res.json("hello world");
})

const PORT = 5000;
app.listen(PORT , err => {
    if(err){
        console.log(err)
    }else{
        console.log("Listening on localhost PORT:", + 5000 , '...')
    }
});
