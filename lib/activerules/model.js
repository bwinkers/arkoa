/**
 * ActiveRules Model
 *
 * A model provides functionality around schema defined data
 */
"use strict";

/**
 * Mongo DB Connection
 * Use Mongorito generator driven Mongo connector
 */
var Mongorito = require('mongorito');

// Connect to the DB
Mongorito.connect('localhost/activerules'); //@todo read from config

/**
 * ActiveRules Model wraps a Mongorito model.
 *
 * Multiple schema can be related to a model and the data in the model can be validated against those schema.
 */
class Model extends Mongorito.Model {


}

//Model.prototype.Model = new Model;

module.exports = new Model();
