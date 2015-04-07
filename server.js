/**
 * ActiveRules implemented on top of Koa.
 *
 * @module arkoa
 * @copyright 2015 - Brian Winkers
 * @license MIT
 */
"use strict";

/**
 * System wide settings, most settings will be in ActiveRules sites
 * File-based Configuration support, using nconf for bow
 *
 * Setup nconf to use (in-order):
 * 1. Command-line arguments
 * 2. Environment variables
 * 3. A file located at 'path/to/config.json'
 *
 * @type {exports}
 */
var settings = require('nconf');
settings.argv()
    .env()
    .file({ file: './config/settings.json' });
// Add the app root to the settings
settings.add('app', { type: 'literal', store: { 'rootDir': __dirname} });

/**
 * Koala provides a Koa app with good default middleware
 *
 * @type {function(): app|exports}
 */
var koa = require('koala');

/**
 * Create the Koa app with Koala middleware
 */
var app = koa();

/**
 *  Include the controller routes and handlers
 */
var router = require('./lib/controllers');

/**
 * Load the service controllers and their configured routes
 */
router.loadControllers(settings);

/**
 * Use the routes in our app
 */
app
    .use(router.routes())
    .use(router.allowedMethods());

/**
 * Have the App accept Requests
 */
app.listen(3000);