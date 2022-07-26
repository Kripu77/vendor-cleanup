const fs = require('fs');
console.log(Date.now())
const timeStamp = Date.now();


//wite file function
const writeFileCSV = (storeName, vendorName, compiledStatus)=>{

   console.log(compiledStatus)
compiledStatus.map((val)=>{
    

    fs.writeFileSync(`./Results/${storeName} ${vendorName} ${timeStamp}.csv`, `${val.FullName}, ${val.Code}, ${val.Status}\n`,{flag: "a"} )
})
}


module.exports = {
    writeFileCSV
}