# Setting up the dev environment

## NPM

### npm-init.js

The `npm-init.js` file contains the code that will be executed whenever the `npm init` command is ran. It is possible to customize that file to add prompts, properties or actions to execute whenever a project is initialized.

For instance, i have written some code into my `npm-init.js`
 file to include a bunch of boilerplate stuff to my project depending on whether it is written using typescript or not, as well as some default dev dependencies and scripts. This file can be found in the `configuration-files/` directory in this repository.
### Packages

```sh
npm install jq prettier typescript jest @types/jest @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser rimraf eslint version-bump-prompt tsutils nodemon --location=global
```