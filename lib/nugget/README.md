ActiveRules Nugget Models
=========================

Part of the ActiveRules project

Nugget's provide business logic around one or more schema.
The model validates data against the schema outside of the data connection.
This makes it easy for the same model to support different backend DB's for the same object.

## Supported DB
* MongoDB via Mongorita - Provides document/record storage
* Cayley via cayley.js - Provides relationships and complex indexing

## MongoDB / Mongorita Setup and Configuration
Database:
http://docs.mongodb.org/manual/installation/
Client: 
http://mongorito.com/guides/getting-started/

## Cayley Setup and Configuration
Database:
https://github.com/google/cayley
Client:
https://github.com/villadora/cayley.js


