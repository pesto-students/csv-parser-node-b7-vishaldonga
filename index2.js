const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

const fileJSONName = "testjson.json";

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
    ws.push(JSON.stringify(csvFile));
  });
}

parseJSONToCSV(fileName, ",");
