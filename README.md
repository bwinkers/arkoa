ARKOA - ActiveRules on Koa
==========================

ActiveRules on Koa 
A powerful framework for creating the next generation of peer-to-peer, social and interactive web sites.
With ActiveRules `Zero Code API` you simply define your business objects and the rules for how they interact and the API endpoints are auto-generated.

## Data Models
* Data objects are stored in JSON
* Objects have a defined JSON Schema
* All data can be validated against its schema
* Schema validation errors are handled in a consistent manner
* No validation should happen at the DB library level. (i.e. Mongoose validation)
* JSON object are converted to JavaScript objects for processing.
* The JavaScript objects properties and methods are defined within the schema


## Directory and File Structure

config
  |-settings.json - System wide settings
    
docs
  |-out - Docs generated by JSDoc

lib
  |-activerules - ActiveRules functionality and hooks
  |-controllers
    |-index.js - Loads configured controllers
    |-{service_name}
        |-services.json - Defines the service and connects Swagger definitions with handler functions within the models.
    |-models - All the logic of the app is containe din mdoels here

output 
  |-swagger.json - The Swagger spec file created by combining the patsh defined for each service controller.    


### License
ActiveRules and all of it's modules are released under the MIT license, this permits broad reuse.
http://opensource.org/licenses/MIT
