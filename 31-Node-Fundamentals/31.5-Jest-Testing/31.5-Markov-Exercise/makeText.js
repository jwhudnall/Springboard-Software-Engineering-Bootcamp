/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");
const fs = require("fs");
const axios = require("axios");
const cliArgs = process.argv.slice(2);
const source = cliArgs[1];

const makeText = (source) => {
  const mm = new MarkovMachine(source);
  console.log(mm.makeText());
};

const createMarkovURL = async (source) => {
  try {
    const res = await axios.get(source);
    makeText(res.data);
  } catch (e) {
    console.error(`Error reading ${source}: ${e}`);
    process.exit(1);
  }
};

const createMarkovText = (source) => {
  fs.readFile(source, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error reading ${source}: ${err}`);
      process.exit(1);
    } else {
      makeText(data);
    }
  });
};

if (source && cliArgs[0] === "file") {
  createMarkovText(source);
} else if (source && cliArgs[0] === "url") {
  createMarkovURL(source);
} else {
  console.error(
    'makeText requires "file" or "url" argument, along with a source.'
  );
  process.exit(1);
}
