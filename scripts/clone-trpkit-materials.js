const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const projectDir = path.resolve(__dirname, "..");
const cloneDir = path.join(projectDir, "tmp/materials");
const blogDir = path.join(projectDir, "apps/marketing/src/content/blog");
const legalDir = path.join(projectDir, "apps/marketing/src/content/legal");

function cloneRepository() {
  return new Promise((resolve, reject) => {
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
  });
}

function copyFiles(source, destination) {
  return new Promise((resolve, reject) => {
    fs.readdir(source, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const destPath = path.join(destination, file);

        fs.copyFile(sourcePath, destPath, (err) => {
          if (err) {
            reject(err);
          }
        });
      });

      resolve();
    });
  });
}

function promptLicenseAgreement() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Do you agree to the license of the materials repository? (Y/N): ", (answer) => {
      if (["Y", "Yes", "y", "yes"].includes(answer.trim())) {
        resolve();
      } else {
        reject(new Error("License agreement not accepted. Exiting."));
      }
      rl.close();
    });
  });
}

async function main() {
  try {
    await promptLicenseAgreement();

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
    console.error(error.message);
  }
}

main();
