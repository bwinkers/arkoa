'use strict';
var Nugget = require('../index.js')

var Page = function () {};

Page.prototype.siteHomepage = function * siteHomepage (next){
    console.log('HERE!!!!!!!!!!!!');
    var data = {"test":"data", "more":"data2"};
    this.body = data;
}

module.exports = new Page();
