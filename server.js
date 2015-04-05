/**
 * ActiveRules implemented on top of Koa.
 */
"use strict";

var koa = require('koa');
var app = koa();

var ar = require('./lib/activerules');

var Model = ar.Model;

// x-response-time

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){

    class Post extends Model {

    }

    // create new Post document
    var post = new Post({
        title: 'Node.js with --harmony rocks!',
        body: 'Long post body',
        author: {
            name: 'John Doe'
        }
    });


    // create
    yield post.save();


    // update document
    post.set('title', 'Post got a new title!');
    post.set('author.name', 'Doe John');


    // update
    yield post.save();


    this.body = 'Hello World';
});

app.listen(3000);