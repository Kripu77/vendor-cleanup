
const csv = require("csvtojson");
const {run} = require("../datacleanup");
const converter = require('json-2-csv');

async function convertJson(file) {
  try {
    let data = await csv().fromFile(file);
    return data
  } catch (err) {
    if (err) throw err;
  } finally {
    console.log("data logged");
  }
}


const handleGet =(req, res)=>{
    

    res.status(200).json({success:true, data: "Instert data"});


}



const handlePost = async(req, res)=>{
//console.log(req.file)
//    const {csv }= req.body.file;
//    console.log(csv)
let data = await convertJson(req.file.path);

if(data){
 let testData= await run(data);

 converter.json2csv(testData, (err, csv)=>{
  console.log(csv)
  if(err) throw err;

  res.status(201).attachment( `${ data[0].Store}.csv`).send(csv)
 })
  
  
}

}


module.exports= {
    handleGet, handlePost
}