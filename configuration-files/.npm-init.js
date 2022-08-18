const fs = require("fs");
//const fsx = require("fs-extra");

// This file has to be created in the user home directory
// It will override the default behavior of the "npm init" command
// This will make it so that a bunch of dev dependencies are installed, a bunch of scripts are created and the github registry is set correctly
// TODO: Use FSX to copy the directory recursively
const boilerplateDir = require("os").homedir() + "\\npm-boilerplates";
let pt = "js";

const tsBoilerplateFiles = {
  "./.prettierrc": `${boilerplateDir}\\ts\\.prettierrc`,
  "./.npmignore": `${boilerplateDir}\\ts\\.npmignore`,
  "./.github/workflows/main.yml": `${boilerplateDir}\\ts\\.github\\workflows\\main.yml`,
  "./tslint.json": `${boilerplateDir}\\ts\\tslint.json`,
  "./tsconfig.json": `${boilerplateDir}\\ts\\tsconfig.json`,
  "./jest.config.js": `${boilerplateDir}\\ts\\jest.config.js`,
  "./.gitignore": `${boilerplateDir}\\ts\\.gitignore`,
  "./rest.http": `${boilerplateDir}\\ts\\rest.http`,
  "./src/index.ts": `${boilerplateDir}\\ts\\src\\index.ts`,
  "./src/test/index.test.ts": `${boilerplateDir}\\ts\\src\\index.ts`,
};

module.exports = {
  name: prompt("package name", basename || package.name),
  version: prompt("version", "0.0.0"),
  decription: prompt("description", ""),
  main: prompt("entry point", "index.js"),
  projectType: prompt("Project type (js/ts)", (answer) => {
    if (answer == "ts") {
      pt = answer;
      if (!fs.existsSync("./src")) fs.mkdirSync("./src");
      if (!fs.existsSync("./src/test")) fs.mkdirSync("./src/test");
      if (!fs.existsSync("./dist")) fs.mkdirSync("./dist");
      if (!fs.existsSync("./.github")) fs.mkdirSync("./.github");
      if (!fs.existsSync("./.github/workflows"))
        fs.mkdirSync("./.github/workflows");

      for (let file in tsBoilerplateFiles) {
        let fileContent = fs.readFileSync(tsBoilerplateFiles[file], "utf8");
        if (!fs.existsSync(file)) fs.writeFileSync(file, fileContent);
      }
    } else {
      pt = "js";
    }
    return pt;
  }),
  keywords: prompt(function (s) {
    return s.split(/\s+/);
  }),
  author: {
    name: "Jonathan Lafreniere",
    email: "jonathan.lafreniere@gmail.com",
  },
  publishConfig: {
    registry: "https://npm.pkg.github.com",
  },
  license: "MIT",
  repository: prompt("Github repository url", ""),

  devDependencies: prompt("Include dev dependencies (Y/N)?", function (answer) {
    if (
      answer == "Y" ||
      answer == "y" ||
      answer == "yes" ||
      answer == "Yes" ||
      answer == ""
    ) {
      if (pt == "js") {
        return {
          jest: "^28.1.3",
          nodemon: "^1.18.4",
          prettier: "^2.7.1",
          rimraf: "^3.0.2",
          eslint: "^8.22.0",
          "eslint-config-prettier": "^8.5.0",
          "eslint-plugin-jest": "^26.8.2",
          "version-bump-prompt": "^6.1.0",
        };
      } else if (pt == "ts") {
        return {
          "@types/jest": "^28.1.6",
          "@types/node": "^16.11.48",
          "@typescript-eslint/eslint-plugin": "^5.33.0",
          "@typescript-eslint/parser": "^5.33.0",
          eslint: "^8.22.0",
          "eslint-config-prettier": "^8.5.0",
          "eslint-plugin-jest": "^26.8.2",
          jest: "^28.1.3",
          prettier: "^2.7.1",
          rimraf: "^3.0.2",
          "ts-jest": "^28.0.7",
          tsutils: "^3.21.0",
          typescript: "^4.7.4",
          "version-bump-prompt": "^6.1.0",
        };
      }
    } else return {};
  }),
  scripts: prompt("Include scripts? (Y/N)?", (answer) => {
    if (
      (module.exports.projectType == "ts" && answer[0] == "y") ||
      answer[0] == "Y"
    ) {
      return {
        start: "node dist/index.js",
        clean: "rimraf coverage build tmp",
        build: "tsc -p tsconfig.json",
        "build:watch": "tsc -w -p tsconfig.json",
        "build:release": "npm run clean && tsc -p tsconfig.release.json",
        lint: "eslint ./src --ext .ts --ext .mts",
        test: "jest --coverage",
        prettier: "prettier --config .prettierrc --write .",
        "test:watch": "jest --watch",
      };
    } else {
      return {
        test: "jest --coverage",
        clean: "rimraf coverage build tmp",
        prebuild: "npm run lint",
        start: "node index.js",
        lint: "eslint .",
        watch: 'nodemon --watch . --exec "npm run start"',
        prettier: "prettier --config .prettierrc --write .",
        versionBump: "bump --tag --push --all",
        "test:watch": "jest --watch",
      };
    }
  }),
};
