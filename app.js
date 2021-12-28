const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

//morgan for displaying all the req in terminal
app.use(morgan("dev"));

//for parsing all the req and res data in the right format
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/" , (req , res ) => {
    res.json("Hello world");
})

const PORT = 5000;
app.listen(PORT , err => {
    if(err){
        console.log(err)
    }else{
        console.log("Listening on localhost PORT:", + 5000 , '...')
    }
})
