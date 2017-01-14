
## Install/Build

- use the command  ` npm run build ` to install npm modules and build a dist/

To prevent bundling of `import`ed third party libraries reference them in the `externals` property in
 the webpack.dist.js. The source code of the libraries referenced in externals will not be included in the
 distribution bundle but will be `require`ed.
Reference : https://webpack.js.org/configuration/externals/

## Development

- If there is a demo, use the command `npm run dev`  to start the webpack-dev-server with demo/ as the content base
 with hot reloading. In this case, the bundle is built and stored in memory.

Webpack-dev-server serves at http://localhost:8080/

