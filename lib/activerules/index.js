/**
 * ActiveRules functions.
 * These function are used across ActiveRules modules.\
 * They provide promise based solutions to many common tasks within an app.
 */
"use strict";

var Promise = require('bluebird')
    , fsp = require('promised-io/fs') // Promises around fs calls;
    , fs = require('fs');

/**
 * Returns stats for the given file or null if it doesn't exist.
 */
exports.getFileStats = function(path) {
    return new Promise(function (resolve, reject) {
        fs.stat(path, function (error, stats) {

            if (error && error.code !== "ENOENT") {
                reject(error);
            } else {
                resolve(stats || null);
            }
        });
    });
};

/**
 * Returns one of directory|file|null
 */
exports.fileStatus = function(path) {

    return this.getFileStats(path)
        .then(function (stats) {

            if (stats && stats.isFile()) {
                return 'file';
            }

            if (stats && stats.isDirectory()) {
                return 'directory'
            }

            return null
        });
};

/**
 * Load a JSON file into a JavaScript object
 */
exports.loadJSON = function(filePath) {

    var jsonObj; // The object to return

    // Return a promise right away
    return new Promise(function (fulfill, reject) {

        return fsp.readFile(filePath, 'utf8')
            .then(function (file) {
                try {
                    jsonObj = JSON.parse(file);
                } catch (err) {
                    // probably bad JSON
                    console.log(err);
                }

                fulfill(jsonObj);

            }, function (err) {
                reject(err);
            });
    });
};



/**
 *  Attempt to load a JSON file and validate it against a Nugget provided schema
 *  If all succeeds you get a validated JSON file.
 *  If either file doesn't exist or is invalid you will get a standard ActiveRules error message.
 *
 * @param jsonFilePath - Path to a valid JSON object
 * @param schema - A schema identifier - Represents a schema name for a path and file within Nugget
 * @param validationLevel - What level of validation strict|lax|partial
 * @returns {bluebird} or arError object
 */
exports.tryCoreSchemaObject = function(jsonFilePath, schema, validationLevel) {

    var schemaObj; // The validated object to retu

    // Verify the host file exists
    return this.fileStatus(jsonFilePath)
        .then(function(fileStatus) {

            // If ActiveRules has determined this is a file, load it.
            if (fileStatus === 'file') {
                return this.loadCoreSchemaObject(jsonFilePath, schema, validationLevel);

            }

            return {
                "message": "required file not found",
                "logMessage": "required file not found: " + jsonFilePath
            }
        });
};



/**
 *  Load a JSON file and validate it against a Nugget provided schema
 *
 * @param jsonFilePath - Path to a valid JSON object
 * @param schema - A schema identifier - Represents a schema name for a path and file within Nugget
 * @param validationLevel - What level of validation strict|lax|partial
 * @returns {bluebird}
 */
exports.loadCoreSchemaObject = function(jsonFilePath, schema, validationLevel) {

    // Load the provided JSON object file via an ActiveRules function that returns Promise
    return this.loadJSON(jsonFilePath)
        .then(
        function(jsonObj) {
            // Verify the schema file exists
            return this.fileStatus(__dirname + schema)
                .then(function(schemaStatus) {
                    // The schema needs to be a file
                    if(schemaStatus === 'file') {
                        // Create the validator
                        var validate = validator(schema);
                        // Validate the JSON data
                        validate(jsonObj);

                        if(validate.errors) {
                            return validate.errors;
                        }

                        return jsonObj;
                    }

                    return false;
                }
            )
        },
        function(err) {
            return err;
        }
    )
};

/**
 *  Validate an object against a schema built-in to Nugget Schema
 *
 * @param jsonObj - A valid JSON object
 * @param schema - A schema identifier - Represents a schema name for a path and file within Nugget
 * @param validationLevel - What level of validation strict|lax|partial
 * @returns {bluebird}
 */
exports.coreSchemaObject = function(jsonObj, schema, validationLevel) {

    // Verify the schema file exists
    return this.fileStatus(__dirname + schema)
        .then(function(schemaStatus) {
            // The schema needs to be a file
            if(schemaStatus === 'file') {
                // Create the validator
                var validate = validator(schema);
                // Validate the JSON data
                validate(jsonObj);

                if(validate.errors) {
                    return validate.errors;
                }

                return jsonObj;
            }

            return false;
        }
    )
};

/**
 * Validates an object against a remote referenced schema.
 *
 * @param jsonObj - A valid JSON object
 * @param schema - A schema identifier - Represents a remote refernce to a schema.
 * @param validationLevel - What level of validation strict|baseline|partial
 * @returns {bluebird}
 */
exports.refSchemaObject = function(jsonObject, schema, validationLevel) {

    // Return a promise rigth away
    return new Promise(function (resolve, reject) {

        // ToDo - Wite a function that validates an object against a remote reference.

    });
};


/**
 * Validates an object against a provide ActiveRules schema.
 *
 * @param jsonObj - A valid JSON object
 * @param schema - A schema that is passed in
 * @param validationLevel - What level of validation strict|lax|partial
 * @returns {bluebird}
 */
exports.schemaObject = function(jsonObject, schema, validationLevel) {

    // Return a promise rigth away
    return new Promise(function (resolve, reject) {

        // Check if the schema file exists
        this.fileStatus(schema)
            .then(function(fileStatus) {
                if(fileStatus === 'file') {

                    // Creata a validator object from JSON schema
                    var validate = validator(schema);

                    // If there were any validation errors reject with erros.
                    if(validate.errors) {
                        reject(validate.errors);
                    }

                    // If there were no errors the object is valid


                }
                else {
                    reject({"error": {
                        "message": "Schema definition not found."
                    }
                    })
                }
            })


    });
}

/**
 *
 * @param jsonObj - A valid JSON object
 * @param schema - A JSON schema
 * @param validationLevel - What level of validation strict|baseline|partial
 * @returns {bluebird}
 */
exports.validate = function(jsonObject, schema, validationLevel) {
    // Return a promise rigth away
    return new Promise(function (resolve, reject) {


    });
}
