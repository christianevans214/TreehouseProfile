var fs = require('fs');


function mergeValues(values, content){
	//cycle over the keys
	for (var key in values){
		content = content.replace("{{" + key + "}}", values[key])

		//replace all {{key}} with values from values object
	}

	return content;
}

function view(templateName, values, response){
	//read from template files
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"}); 
	//insert values in to the content

	fileContents = mergeValues(values, fileContents);

	response.write(fileContents);
	
	//write out to the response
}

module.exports.view = view;