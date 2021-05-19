const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

const fileCSVName = "testcsv.csv"; //SampleCSVFile_2kb testcsv
const fileJSONName = "testjson.json";

function parseCSVToJSON(
  fileName,
  delimiter,
  withHeader,
  headerTransformation = null
) {
  const filePath = path.resolve(fileName);

  const rs = fs.createReadStream(filePath);
  const ws = new Transform();

  //rs.setEncoding("utf-8");
  rs.on("data", function (chunk) {
    let transformedChunk = chunk
      .toString()
      .replace(/(\r|\r\n|¬)/g, "")
      .split("\n");

    transformedChunk = transformedChunk.map((row) => row.split(delimiter));

    if (withHeader) {
      let headers = transformedChunk[0];
      if (headerTransformation !== null) {
        headers = headerTransformation(headers);
      }
      transformedChunk = transformedChunk.slice(1);
      let obj = {};
      let resultArray = [];
      for (const row of transformedChunk) {
        row.map((data, col) => {
          obj[headers[col]] = data;
        });
        resultArray.push(obj);
      }
      transformedChunk = resultArray;
    }
    console.log(transformedChunk);
    ws.push(JSON.stringify(transformedChunk));
  });
}

// parseCSVToJSON(fileName, ",", true, (header) =>
//   header.map((column) => column.toUpperCase())
// );

function parseJSONToCSV(fileName, delimiter) {
  const filePath = path.resolve(fileName);
  const rs = fs.createReadStream(filePath);
  const ws = new Transform();

  rs.on("data", function (chunk) {
    const jsonData = JSON.parse(chunk.toString());
    delimiter = `"${delimiter}"`;
    csvFile = jsonData.map((row) => Object.values(row));
    csvFile.unshift(Object.keys(jsonData[0]));
    csvFile = `"${csvFile.join('"\n"').replace(/,/g, delimiter)}"`;
    ws.push(JSON.stringify(transformedChunk));
  });
}

//parseJSONToCSV(fileName, ",");

module.exports = {
  parseCSVToJSON,
  parseJSONToCSV,
};
