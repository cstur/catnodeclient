var http = require('http');
var fs = require('fs');
var cat = require("../src/cat");

var server = http.createServer(function (request, response) {
  
var fileName='../src/cat.js';
var t = cat.span('SampleTransaction', fileName); /* Create Transaction t, which is a root transaction */
var subSpan = t.span('ReadFile', fileName); /* Create Sub Transaction of t */
fs.readFile(fileName, function(err, data) {
    t.event("ReadFile", fileName, "0"); /* Create and event of transaction t */
    if(err){
        t.error(err); /* Create and error of transaction t */
    }

    fs.readFile("not exist", function(err, data) {
        if(err){
            subSpan.error(err); /* Create and error of transaction subSpan */
        }
        subSpan.end(); /* complete transaction */
        
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello World\n');
    }); 
    
}); 
t.end();
  
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');