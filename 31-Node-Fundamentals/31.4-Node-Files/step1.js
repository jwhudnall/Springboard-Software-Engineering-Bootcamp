const argv = process.argv;
const fs = require("fs");

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

cat(argv[2]);
