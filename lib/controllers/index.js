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
 * The ActiveRules module provides functions useful within the ActiveRules paradigm
 * @type {exports}
 */
var ar = require('../activerules/');

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
 * The root directory to base other paths on
 *  @type {string}
 */
var rootDir =  '';

/**
 * The directory models are stored in
 * @type {string}
 */
var modelDir = '';

/**
 * Start with an empty Swagger schema, this gets populated while looping through services.
 * @type {{}}
 */
var swaggerSchema = {};

/**
 * Load controller routes for all configured services
 * @param services {array} Array of service directory names within /controllers.
 */
Routes.prototype.loadControllers = function (settings) {

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
        this.loadController(service, settings);
    }

    // Write out the Swagger file

    router.get('/', function *(next) {
        this.body = 'Welcome'
    });
};

/**
 * Load a single service controller
 * If the service has a valid service JSON file, read it's paths.
 * The paths are valid swagger paths with an additional handler property.
 * The handler property defines an ActiveRules model and method to handle the request.
 * @param service {string} A directory with this name and a service.json file needs to exist in /controllers..
 */
Routes.prototype.loadController = function (service, settings) {

    // Set the root dir based on the settings, other paths are based off this.
    rootDir = settings.get('rootDir');

    // Define the models directory.
    modelDir = rootDir + '/lib/models/';

    // Define the service definition file path
    var serviceDefinitionPath = rootDir + '/lib/controllers/' + service + '/service.json';

    console.log(rootDir + ' ' + modelDir  + ' ' +  serviceDefinitionPath);

    return ar.loadCoreSchemaObject(serviceDefinitionPath, '/activerules/webService.json')
        .then(function(serviceDefinition) {

            console.log(serviceDefinition);

            //console.log("Loaded Service Definition: " + serviceDefinition);


        });

/*
    var serviceModulePath = setti  + '/services/' + service;

    services[service] = require(serviceModulePath);

    app.use(services[service]);


    var servicePath = configDir  + '/services/' + service + '/routes.json';

    return nugget.loadCoreSchemaObject(servicePath, '/schema/activerules/webService.json')
        .then(function(routes) {

            console.log("Loaded Service: " + service);

            _.forOwn(routes, function(route) {
                // load each route
                loadRoute(app, route);
            });
        });
        */
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

