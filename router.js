var Profile = require("./profile.js");
var render = require("./render")
var querystring = require("querystring");


var commonHeaders = {'Content-Type': 'text/html'}
//router.js
// Handle the HTTP route GET / and POST / i.e. Home.
function home(request, response){
	//if url == "/" && GET
	if (request.method.toLowerCase() === "get"){
		//show search
		response.writeHead(200, commonHeaders );
	  	render.view("header", {}, response);
	  	render.view("search", {}, response);
	  	render.view("footer", {}, response);
	  	response.end();

	} else {
		//if url == "/" && POST
		request.on("data", function(postBody){
			var query = querystring.parse(postBody.toString())
			response.writeHead(303, {'Location': "/" + query.username});
			response.end();
		})


		//get POST data from body
			//extract username
				//redirect to username

	}
}
//Handle the HTTP route for GET /:username i.e. /chalkers
function user(request, response){
	//if url == "/...."
	var username = request.url.substring(1);
	if (username.length > 0){
		if (request.method.toLowerCase() === "get"){
		response.writeHead(200, commonHeaders);
		render.view("header", {}, response);
		//GET JSON from treehouse 
		var studentProfile = new Profile(username);

		//on 'end'
		studentProfile.on("end", function(profileJSON){
			//show Profile
			//Store the values which we need
			var values = {
				avatarURL: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badgesCount: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			};
			//simple response
			render.view('profile', values, response);
			render.view('footer', {}, response);
			response.end();
			

		});
		
		//on error 
		studentProfile.on("error", function(error){
			//show error
			render.view('error', {errorMessage: error.message}, response);
			render.view("search", {}, response);
			render.view('footer', {}, response);
			response.end();
			
		});
	}
	}
}
module.exports.home = home;
module.exports.user = user;