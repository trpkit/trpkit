const pkg = require("../package.json");
const glob = require("glob");
const fs = require("node:fs");

["./apps/**/package.json", "./packages/**/package.json"].forEach((dir) =>
  glob.sync(dir).forEach(
    (loc) =>
      !loc.includes("node_modules") &&
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
      )
  )
);
