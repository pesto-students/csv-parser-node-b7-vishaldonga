const { parseCSVToJSON, parseJSONToCSV } = require("./index");


const fileCSVName = "data/testcsv.csv"; //SampleCSVFile_2kb testcsv
const fileJSONName = "data/testjson.json";


console.log(parseCSVToJSON(fileCSVName, ",", false, null));
console.log(parseJSONToCSV(fileJSONName, ","));

