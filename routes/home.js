const express = require('express');
const home = express.Router();
const { handleGet, handlePost} = require("../controllers/homeController")

const multer = require('multer');


var uploads = multer({ dest: "../public" });


home.get("", handleGet);


//post data
home.post("", uploads.single('csv'), handlePost)



module.exports={
    home
}