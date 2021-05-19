const { parseCSVToJSON, parseJSONToCSV } = require("./index");

const fileCSVName = "data/testcsv.csv"; //SampleCSVFile_2kb testcsv
const fileJSONName = "data/testjson.json";

parseCSVToJSON(fileCSVName, ",", false, null).on("data", (chunk) => {
  console.log(chunk.toString());
});

parseJSONToCSV(fileJSONName, ",").on("data", (chunk) => {
  console.log(chunk.toString());
});
