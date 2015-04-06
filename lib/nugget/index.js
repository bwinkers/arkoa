/**
 * Nugget Data Objects
 *
 * Nugget's provide business logic around one or more schema.
 * The model validates data against the schema outside of the data connection.
 * This makes it easy for the same model to support different backend DB's.
 *
 * Supported DB:
 * MongoDB via Mongorita - Provides document/record storage
 * Cayley via cayley.js - Provides relationships and complex indexing
 *
 * @module nugget
 * @copyright Brian Winkers
 * @license MIT
 */
"use strict";

/**
 * MongoDB connection
 */
var docStorage = require('mongorito');
// Connect to the MongoDB
docStorage.connect('localhost/activerules'); //@todo read from config

/**
 * Cayley DB connection
 */
var graph = require('cayley');
// Connect to Cayley
var graphStorage = cayley('http://localhost:64210/'); //@todo read from config


/**
 * Nugget
 * @constructor
 */
var Nugget = function Nugget() {
    var self = this instanceof Nugget
        ? this
        : Object.create(Nugget.prototype);
}

/**
 * Use the ActiveRules model class
 *
 * @type {Model|*}
 */
Nugget.prototype.model =  Model;


Nugget.prototype.API = function() {
    console.log('Nugget.API called');
    var api = {
        "name": "My API"
    }
    return api;
};

module.exports = new Nugget();

