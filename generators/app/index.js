var generators = require('yeoman-generator');
var inquirer = require("inquirer");

module.exports = generators.Base.extend({
	bowerPackages: function() {

		inquirer.prompt([{
			type: "checkbox",
			message: "Select bower packages to install",
			name: "Bower packages",
			choices: [
				new inquirer.Separator("Css Framework:"),
				{name: "Bootstrap"}, {name: "Foundation"},
			]
		}], function( answers ) {
			console.log( JSON.stringify(answers, null, " ") );
		});

	}
});
