const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const { home } = require('./routes/home');
const port = 3000;


//body parser middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//logger middleware
app.use(morgan("tiny"));

//static middleware
app.use(express.static("./static"))
//home route

app.use("/" , home)



app.listen(process.env.PORT || port, (err, res)=>{

    if(err) throw err;
    else console.log(`Server running on port ${port}`)
})