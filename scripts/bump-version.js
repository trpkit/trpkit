const pkg = require("../package.json");
const glob = require("glob");
const fs = require("fs");

glob.sync("./apps/**/package.json").forEach(
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
);

glob.sync("./packages/**/package.json").forEach(
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
);
