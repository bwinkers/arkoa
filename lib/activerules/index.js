/**
 * ActiveRules entry point
 */
"use strict";

var Mongorito = require('mongorito');
// Connect to the DB
Mongorito.connect('localhost/activerules'); //@todo read from config

function ActiveRules() {
    //new-agnostic constructor
    var self = this instanceof ActiveRules
        ? this
        : Object.create(ActiveRules.prototype);
}


ActiveRules.prototype.version = function() {

    console.log('ActiveRules');

    return '0.1.0';
};

class Model extends Mongorito.Model {


}

ActiveRules.prototype.Model =  Model;

module.exports = new ActiveRules('ar');