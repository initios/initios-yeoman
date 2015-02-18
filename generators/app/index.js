var generators = require('yeoman-generator');
var inquirer = require("inquirer");
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

    initializing: function () {
        this.store = {
            "bower-dependencies": []
        }
    },

    writing: function () {
        // App directory structure
        this.directory('app', 'app');

        this.template('_bower.json', 'bower.json');
        this.template('_.bowerrc', '.bowerrc');
        this.template('_package.json', 'package.json');
        this.template('_gulpfile.js', 'gulpfile.js');
        this.template('_.gitignore', '.gitignore');
        this.template('_index.jade', './app/index.jade');
    },

    install: function () {
        this.installDependencies();
    },

    end: function () {
        this.log(yosay('Almost done! ' + chalk.green('running default gulp task')));
        this.spawnCommand('node_modules/gulp/bin/gulp.js');
    }
});
