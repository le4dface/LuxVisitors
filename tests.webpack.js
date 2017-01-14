
 /*
 * require.context
 * This file is an entry point for angular tests
 * Avoids some weird issues when using webpack + angular.
 * Requires the directory to match within
 * Requires a boolean flag to include or exclude subdirectories
 * Requires a regular expression to match files against.
 * Reference: https://webpack.github.io/docs/context.html#require-context
 * */

// TODO: update context if required
const context = require.context('./app/tests', true, /\.spec.js$/);
context.keys().forEach(context);

