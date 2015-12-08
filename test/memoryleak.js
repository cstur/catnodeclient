var http = require('http');
var cat = require("../src/cat");

var server = http.createServer(function (request, response) {

    var t = cat.span('MemoryLeakTransaction', 'Name'); /* Create Transaction t, which is a root transaction */
    t.end();
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
    
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');