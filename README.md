
## Install/Build

- use the command  ` npm run build ` to install npm modules and build a dist/

To prevent bundling of `import`ed third party libraries reference them in the `externals` property in
 the webpack.dist.js. The source code of the libraries referenced in externals will not be included in the
 distribution bundle but will be `require`ed.
Reference : https://webpack.js.org/configuration/externals/

## Development

- If there is a demo, use the command `npm run dev`  to start the webpack-dev-server with demo/ as the content base
 with hot reloading. In this case, the bundle is built and stored in memory.

- use the command ` npm run dist ` to start the webpack-dev-server with dist/ as the content base.

Webpack-dev-server serves at http://localhost:8080/

## Testing

- the command ` npm run test ` will start karma and search recursively for all files ending ".spec.js" that
are within src/
- the command ` npm run test-watch ` will start karma and watch for changes in these files.

Check the directory specified in tests.webpack.js. This file is an entry point for angular tests. The specified
 directory is searched recursively for files that match the regular expression ( /\.spec.js$/ )


### E2E

protractor.conf.js must include property value pairs:
```
    keepAlive: true,
    baseUrl: 'http://localhost:8080',

```
- Run ‘npm run dev’ in new terminal
- Run ‘npm run e2e-setup’ in new terminal
- Run ‘npm run e2e-start’ in new terminal
