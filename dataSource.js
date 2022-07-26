const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");
const csvPath = path.resolve(__dirname, "./datacleanup.csv");

async function convertJson(path) {
  try {
    let data = await csv().fromFile(path);
    return data
  } catch (err) {
    if (err) throw err;
  } finally {
    console.log("data logged");
  }
}


module.exports ={
    convertJson
}