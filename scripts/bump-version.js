const pkg = require("../package.json");
const glob = require("glob");
const fs = require("fs");

// Updating Node.js packages
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

// Updating Rust packages
glob.sync("./apps/**/Cargo.toml").forEach((loc) => {
  const data = fs.readFileSync(loc, "utf-8");
  const newData = data.replace(/(\[package\][^\[]*version\s*=\s*)"[^"]*"/, `$1"${pkg.version}"`);
  fs.writeFileSync(loc, newData);
});

glob.sync("./packages/**/Cargo.toml").forEach((loc) => {
  const data = fs.readFileSync(loc, "utf-8");
  const newData = data.replace(/(\[package\][^\[]*version\s*=\s*)"[^"]*"/, `$1"${pkg.version}"`);
  fs.writeFileSync(loc, newData);
});
