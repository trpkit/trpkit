const pkg = require("../package.json");
const glob = require("glob");
const fs = require("node:fs");

for (const dir of ["./apps/**/package.json", "./packages/**/package.json"]) {
  for (const loc of glob.sync(dir)) {
    if (!loc.includes("node_modules")) {
      fs.writeFileSync(
        loc,
        JSON.stringify(
          {
            ...JSON.parse(fs.readFileSync(loc)),
            version: pkg.version,
          },
          null,
          2
        )
      );
    }
  }
}
