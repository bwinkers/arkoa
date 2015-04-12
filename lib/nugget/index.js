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
var Mongorito = require('mongorito');
// Connect to the MongoDB
Mongorito.connect('localhost/activerules'); //@todo read from config

/**
 * Cayley DB connection
 */
var cayley = require('cayley');
// Connect to Cayley
var cayleyConn = cayley('http://localhost:64210/'); //@todo read from config

"use strict";

/**
 * ActiveRules Model wraps a Mongorito model.
 *
 * Multiple schema can be related to a model and the data in the model can be validated against those schema.
 */
class Nugget extends Mongorito.Model {


}


Nugget.prototype.test = function(varx) {

}

module.exports = new Nugget();


