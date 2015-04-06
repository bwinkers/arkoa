/**
 * ActiveRules Controller/Routes/Handler Reader
 */
"use strict"

/**
 * Use a JSON Schema validator
 * @type {exports}
 */
var validator = require('is-my-json-valid');

/**
 * Set the schema we'll validate against, currently a local copy of the Swagger schema.
 * @type {exports}
 */
var serviceSchema = require('../nugget/schema/swagger/v2.0/schema.json');

/**
 * ActiveRules provide function useful across the ActiveRules modules
 * @type {exports}
 */
var ar = require('../lib/activerules/');

/**
 * Koa Router - Similar to Express router
 * We add routes to the router and then use it in the app.
 * @type {exports}
 */
var router = require('koa-router')();

/**
 * Routes object
 * @constructor
 */
var Routes = function () {};

var swaggerSchema = {};

/**
 * Load controller routes for all configured services
 *
 * @param services
 */
Routes.prototype.loadControllers = function (services) {

    // Loop through services

    // Load and validate the service.json for the service directory

    // If services.json is valid read the paths from the JSON

    // Add the paths to the Swagger object

    // Create Koa Route for each path

    // Add the Swagger elements to the Swagger file.

    // Write out the Swagger file




    router.get('/', function *(next) {
        this.body = 'Welcome'
    });

};

Routes.prototype.routes = function() {
    return router.routes();
}

Routes.prototype.allowedMethods = function() {
    return router.allowedMethods();
}

module.exports = new Routes();