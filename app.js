//Problem: We need a simple way to look at a user's badge count and JAvascript point from a web browser
//Solution: Use Node.JS to perform the profile look-ups and serve our template via HTTP.

//Plan:
//Create a web server
var http = require('http');
var router = require('./router.js');
http.createServer(function (request, response) {
	if (request.url === "/"){
		router.home(request,response);
	}
	else {	
		router.user(request,response);
	}
}).listen(1337, 'localhost');






console.log('Server running at http://localhost:1337/');




