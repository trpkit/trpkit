const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const projectDir = path.resolve(__dirname, "..");
const cloneDir = path.join(projectDir, "tmp/opaque-wasm");

function isGitInstalled() {
  return new Promise((resolve, reject) => {
    exec("git --version", (error) => {
      if (error) {
        reject("Git is not installed");
      } else {
        resolve();
      }
    });
  });
}

function isRustInstalled() {
  return new Promise((resolve, reject) => {
    exec("rustc --version", (error) => {
      if (error) {
        reject("Rust is not installed");
      } else {
        resolve();
      }
    });
  });
}

function cloneOpaqueWasmRepository() {
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
        exec(`git clone https://github.com/marucjmar/opaque-wasm ${cloneDir}`, (error) => {
          if (error) {
            reject(`Error cloning repository: ${error}`);
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

function buildServer() {
  return new Promise((resolve, reject) => {
    exec(
      "wasm-pack build --out-dir ../../packages/opaque-server --scope trpkit --out-name opaque-server --release --target nodejs ./tmp/opaque-wasm",
      { cwd: projectDir },
      (error) => {
        if (error) {
          reject(`Error building server: ${error}`);
        } else {
          resolve();
        }
      }
    );
  });
}

function buildClient() {
  return new Promise((resolve, reject) => {
    exec(
      "wasm-pack build --out-dir ../../packages/opaque-client --scope trpkit --out-name opaque-client --release --target web ./tmp/opaque-wasm --no-default-features --features client",
      { cwd: projectDir },
      (error) => {
        if (error) {
          reject(`Error building client: ${error}`);
        } else {
          resolve();
        }
      }
    );
  });
}

async function main() {
  try {
    await isGitInstalled();
    await isRustInstalled();
    await cloneOpaqueWasmRepository();
    await buildServer();
    await buildClient();

    console.log("Done with Opaque WASM tasks!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
