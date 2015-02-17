var generators = require('yeoman-generator');
var inquirer = require("inquirer");

module.exports = generators.Base.extend({

	initializing: function() {
		this.store = {
			"css-frameworks": [{"bootstrap": null, "foundation": null}]
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

	    	for (var i=0; i<answers.name.length; i++) {
	    		var answer = answers.name[i];

	    		if (answer == "bootstrap") {
	    			this.store["css-frameworks"]["bootstrap"] = true;
	    		}

	    		if (answer == "foundation") {
	    			this.store["css-frameworks"]["foundation"] = true;
	    		}

	    	}

	      done();
	    }.bind(this));
  	},

  	writing: function() {
  		this.template('bower.json', 'bower.json');
  	}
});
