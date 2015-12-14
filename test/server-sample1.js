var http = require('http');
var cat = require("../src/cat");

var server = http.createServer(function (request, response) {
 	var t = cat.span("Sample1","Root");
  	t.addData("name=stur&sex=boy");
  	for (var i = 0; i < 10; i++) {
  		var subT = t.span("Sample1-Sub","SubSpan");
  		subT.end();
  	};
    response.writeHead(200, {'Content-Type': 'text/plain'});
  	response.end('Hello Sample1\n');
  	t.end();
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
