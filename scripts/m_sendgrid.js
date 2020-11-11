const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rapidapi.p.rapidapi.com/mail/send",
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"x-rapidapi-key": "d5818b3709msh45427ec4927c68ap1411cdjsn7461f1b9155d",
		"x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com"
	},
	"processData": false,
	"data": "{\n  \"personalizations\": [\n    {\n      \"to\": [\n        {\n          \"email\": \"chaitanyabhardwaj89@gmail.com\"\n        }\n      ],\n      \"subject\": \"Hello, World!\"\n    }\n  ],\n  \"from\": {\n    \"email\": \"chaitanyabhardwaj89@gmail.com\"\n  },\n  \"content\": [\n    {\n      \"type\": \"text/plain\",\n      \"value\": \"Hello, World!\"\n    }\n  ]\n}"
};

$.ajax(settings).done(function (response) {
	console.log(response);
});