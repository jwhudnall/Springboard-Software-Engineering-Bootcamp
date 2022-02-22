const argv = process.argv;
const fs = require("fs");
const axios = require("axios").default;

function cat(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error reading '${path}':`);
      console.log(`\t${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

function init() {
  if (argv[2]) {
    const kw = argv[2];
    if (kw.indexOf("://") == -1 || kw.indexOf("www.") === -1) {
      cat(kw);
    } else {
      webCat(kw);
    }
  } else {
    console.warn("Script requires additional arguments.");
    process.exit(1);
  }
}

async function webCat(url) {
  try {
    const res = await axios.get(url);
    console.log(res.data);
  } catch (e) {
    console.log(`Error fetching ${url}. Error: ${e}`);
    process.exit(1);
  }
}

init();
