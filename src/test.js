const { parseCSVToJSON, parseJSONToCSV } = require("./index");


const fileCSVName = "testcsv.csv"; //SampleCSVFile_2kb testcsv
const fileJSONName = "testjson.json";


console.log(parseCSVToJSON(fileCSVName, ",", false, null));
console.log(parseJSONToCSV(fileJSONName, ","));

