var generators = require('yeoman-generator');
var inquirer = require("inquirer");
var chalk = require('chalk');
var yosay = require('yosay');

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
				 "bootstrap", "foundation", "jquery", "angular"
			]
	    }, function(answers) {
    		this.store["bower-dependencies"] = answers.name;
    		console.log(this.store);
	      	done();
	    }.bind(this));
  	},

  	writing: function() {
  		this.template('_bower.json', 'bower.json');
		this.template('_package.json', 'package.json');
		this.template('_gulpfile.js', 'gulpfile.js');
		this.template('_.gitignore', '.gitignore');
  	},

  	install: function() {
		this.installDependencies();
  	},

  	end: function() {
  		this.log(yosay('Almost done! ' + chalk.red('running default gulp task')));
		this.spawnCommand('node_modules/gulp/bin/gulp.js');
  	}
});
