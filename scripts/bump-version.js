const glob = require("glob");
const fs = require("node:fs");
const { execSync } = require("node:child_process");

execSync("pnpm exec standard-version --release-as minor --skip.commit --skip.tag", {
  stdio: "inherit",
});

const pkg = require("../package.json");

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

execSync("git add .", { stdio: "inherit" });
execSync(`git commit -m "chore(release): ${pkg.version}"`, { stdio: "inherit" });
execSync(`git tag v${pkg.version}`, { stdio: "inherit" });
