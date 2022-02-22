const argv = process.argv;
const fs = require("fs");
const axios = require("axios").default;

function cat(path, fileOutput) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error reading '${path}'. Error: ${err}`);
      process.exit(1);
    }
    if (fileOutput) {
      return writeData(data, fileOutput);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url, fileOutput) {
  try {
    const res = await axios.get(url);
    if (fileOutput) {
      return writeData(res.data, fileOutput);
    } else {
      console.log(res.data);
    }
  } catch (e) {
    console.log(`Error fetching ${url}. Error: ${e}`);
    process.exit(1);
  }
}

function init() {
  const cliArgs = argv.slice(2);
  let type, input, output;
  if (cliArgs.length > 0) {
    if (cliArgs[0] === "--out") {
      output = cliArgs[1];
      input = cliArgs[2];
      type = getInputType(input);
    } else {
      input = cliArgs[0];
      type = getInputType(input);
    }
    return type === "url" ? webCat(input, output) : cat(input, output);
  } else {
    console.warn("Script requires additional arguments.");
    process.exit(1);
  }
}

function getInputType(arg) {
  const isURL = arg.indexOf("://") !== -1;
  return isURL ? "url" : "text";
}

function writeData(input, output) {
  fs.writeFile(output, input, "utf-8", (err) => {
    if (err) {
      console.log(`Error writing to ${output}. Error: ${err}`);
      process.exit(1);
    }
    return;
  });
}

init();
