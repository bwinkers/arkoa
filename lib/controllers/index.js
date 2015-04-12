/**
 * ActiveRules Controller/Routes/Handler Reader
 */
"use strict"

/**
 * Require lodash
 */
var _ = require('lodash');

/**
 * The ActiveRules module provides functions useful within the ActiveRules paradigm
 * @type {exports}
 */
var ar = require('../activerules/');

/**
 * The directory of the schema files
 *  @type {string}
 */
var schemaDir =  '';

/**
 * The directory controllers are stored in, configured in settings.
 * @type {string}
 */
var controllerDir = '';

/**
 * The directory models are stored in, configured in settings.
 * @type {string}
 */
var modelDir = '';

/**
 * Start with an empty Swagger schema, this gets populated while looping through services.
 * @type {{}}
 */
var swaggerSchema = {};

/**
 * Set the schema we'll validate against, currently a local copy of the Swagger schema.
 */
var serviceSchema = 'schema/swagger/v2.0/schema.json';

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


/**
 * Load controller routes for all configured services
 * @param services {array} Array of service directory names within /controllers.
 */
Routes.prototype.loadControllers = function (settings) {

    // Define the root dir based on the settings, other paths are based off this.
    schemaDir = settings.get('schemaDir');

    // Define the controllers directory.
    controllerDir = settings.get('controllerDir');

    // Define the models directory.
    modelDir = settings.get('modelDir');

    /**
     * The services configured in the settings.
     * @type {array}
     */
    var services = settings.get('services');

    /**
     * The current service being worked on, used within load controllers.
     * @type {string}
     */
    var service = '';

    // Loop through services
    for (var key in services) {

        // Reset the local service variable to the services array key value
        service = services[key];

        // Load this service
        this.loadController(service);
    }

};

/**
 * Load a single service controller
 * If the service has a valid service JSON file, read it's paths.
 * The paths are valid swagger paths with an additional handler property.
 * The handler property defines an ActiveRules model and method to handle the request.
 * @param service {string} A directory with this name and a service.json file needs to exist in /controllers.
 */
Routes.prototype.loadController = function (service) {

    // Define the file path to the service definition
    var serviceController = require(controllerDir + service);

    var  serviceDef = serviceController.serviceDef;

    // Define the final location of the schema we validate service definitions against.
    var serviceSchemaPath = serviceSchema;

    var _this = this;

    return ar.loadObject(serviceDef, serviceSchemaPath)
        .then(function(serviceDefinition) {
            //console.log('PATHS');
            //console.log(serviceDefinition);

            var paths = serviceDefinition.paths;

            // Current spec
            var spec = {};

            // Loop through paths
            for (var path in paths) {

                // Reset the local service variable to the services array key value
                spec = paths[path];

                // Load this service
                _this.loadPath(path, spec);
            }
        });
}

/**
 * Load a path, which may have multiple httpMethod endpoints defined.
 */
Routes.prototype.loadPath = function(path, spec) {
    //console.log('PATH2');
    //console.log(path);
    //console.log(spec);

    /**
     * The current path httpMethod being worked on
     * @type {string}
     */
    var httpMethod = '';

    // Loop through path methods
    for (var httpMethod in spec) {
        //console.log(httpMethod);

        this.loadPathMethod(path, httpMethod, spec[httpMethod]);

    }
}

/**
 * Load a path httpMethod
 */
Routes.prototype.loadPathMethod = function(path, httpMethod, pathSpec) {

    console.log('PATH3');
    console.log(path);
    console.log(httpMethod);
    console.log(pathSpec);

    var handler = pathSpec['x-handler'];

    var controller = handler.controller;

    var controllerFunc = handler.controllerFunc;

    console.log('Controller: ' + controller);
    console.log(controllerFunc);

    var Page = require('../nugget/models/page');

    router[httpMethod]('/', Page.siteHomepage);
}

/**
 * Pass back the raw Koa Router routes
 * @returns {*} Valid Koa Router routes
 */
Routes.prototype.routes = function() {
    return router.routes();
}

/**
 * Pass back the raw Koa Router allowedMethods
 * @returns {*} Valid Koa Router allowedMethods
 */
Routes.prototype.allowedMethods = function() {
    return router.allowedMethods();
}

/**
 * Set the modules entire exports to an isntance of our class.
 * @type {Routes}
 */
module.exports = new Routes();

