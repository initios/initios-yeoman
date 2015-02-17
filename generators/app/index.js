var generators = require('yeoman-generator');
var inquirer = require("inquirer");

module.exports = generators.Base.extend({

	initializing: function() {
		this.store = {
			"bower-dependencies": []
		}
	},

	prompting: function() {
	    var done = this.async();

	    this.prompt({
			type: 'checkbox',
			name: 'name',
			message: "Select bower packages to install",
			store: true,
			choices: [
				new inquirer.Separator("Css Framework:"),
				{name: "bootstrap"}, {name: "foundation"},
			]
	    }, function(answers) {
    		this.store["bower-dependencies"] = answers.name;
    		console.log(this.store);
	      	done();
	    }.bind(this));
  	},

  	writing: function() {
  		this.template('bower.json', 'bower.json');
  	}
});
