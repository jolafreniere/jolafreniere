# NPM

## Packages

The easiest way to create and consume node libraries is through the use of packages. These packages are published to a *registry*, be it npm, github packages or another.

Packages can either be private or public. Anyone can download and install a public package, however, a token is required to access (read) a private package.

This token can either be stored in a `.npmrc` file or set as the `NODE_AUTH_TOKEN`.

## .npmrc

The `.npmrc` file is a npm configuration file. Node will, by default, use the `.npmrc` file located in node's installation folder. However, a .npmrc file can be created by project or by repository. For my purposes, what is important in this file is mostly limited to setting package registries and authorization tokens. For a single registry, a .npmrc file will look like the following:

```sh
@jolafreniere:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=ghp_8xadsad........ # the token
```

> **n.b.** In windows no `.npmrc` file is created when installing node, one must therefore be created manually in the `C:\Program Files\nodejs` folder.

> **n.b.** The auth token is very sensitive data that must be kept private, and hence the file should be gitignored.

Further reading: [NPM official documentation](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc)

## .npmignore

The npmignore file is used to specify which files should not be published as part of the package which will then be accessible on whichever registry it was published.

Any file that is not strictly relevant to the users of the package should be ommitted, for instance, github actions, dev scripts, tests, environment files.

> Assuming that the package is published using, for example, github actions, every `gitignored` file will be omitted by default.