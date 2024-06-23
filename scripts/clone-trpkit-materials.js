const { exec } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const projectDir = path.resolve(__dirname, "..");
const cloneDir = path.join(projectDir, "tmp/materials");
const blogDir = path.join(projectDir, "apps/marketing/src/content/blog");
const legalDir = path.join(projectDir, "apps/marketing/src/content/legal");

function isGitInstalled() {
  return new Promise((resolve, reject) => {
    exec("git --version", (error) => {
      if (error) {
        reject("Git is not installed");
      } else {
        resolve("Git is installed");
      }
    });
  });
}

function cloneRepository() {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(path.join(cloneDir, ".git"))) {
        exec(`git -C ${cloneDir} pull`, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        exec(`git clone https://github.com/trpkit/materials.git ${cloneDir}`, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}

function copyFiles(source, destination) {
  return new Promise((resolve, reject) => {
    fs.readdir(source, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      for (const file of files) {
        const sourcePath = path.join(source, file);
        const destPath = path.join(destination, file);

        fs.copyFile(sourcePath, destPath, (err) => {
          if (err) {
            reject(err);
          }
        });
      }

      resolve();
    });
  });
}

async function main() {
  try {
    await isGitInstalled();

    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    if (!fs.existsSync(legalDir)) {
      fs.mkdirSync(legalDir, { recursive: true });
    }

    await cloneRepository();
    await copyFiles(path.join(cloneDir, "blog"), blogDir);
    await copyFiles(path.join(cloneDir, "legal"), legalDir);

    console.log("Done!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
