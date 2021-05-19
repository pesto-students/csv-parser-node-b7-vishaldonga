const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

function parseCSVToJSON(
  fileName,
  delimiter,
  withHeader,
  headerTransformation = null
) {
  const filePath = path.resolve(fileName);
  const rs = fs.createReadStream(filePath);
  const ws = new Transform();
  let transformedChunk;

  rs.on("data", function (chunk) {
    transformedChunk = chunk
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
    ws.push(JSON.stringify(transformedChunk));
  });  
  return ws;
}

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
    ws.push(csvFile);
  });
  return ws;
}

module.exports = {
  parseCSVToJSON,
  parseJSONToCSV,
};
