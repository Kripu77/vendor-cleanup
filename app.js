const express = require('express');
const app = express();
const morgan = require('morgan');
const { home } = require('./routes/home');
const port = 8000;


//body parser middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//logger middleware
app.use(morgan("tiny"));

//static middleware
app.use(express.static("./static"))
//home route

app.use("/" , home)



app.listen(port, (err, res)=>{

    if(err) throw err;
    else console.log(`Server running on port ${port}`)
})