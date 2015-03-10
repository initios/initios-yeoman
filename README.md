# Initios Yeoman

This is a yeoman generator for an AngularJS project using [Gulp][1], [Bower][2] and [NPM][3].

Includes support for Jade, Coffeescript and Less files.

## GENERATED DIRECTORY STRUCTURE

    app/
      assets/
        scripts/
          app.coffee
        styles/
          app.sass
          lib.sass
        vendor/
          bower_components/
      templates/
      index.jade
    build/
      css/
        app.css
        lib.css
      js/
        app.js
        lib.js
      index.html
    specs/
    node_modules/
    conf.js
    .bowerrc
    .gitignore
    bower.json
    gulpgile.js
    package.json
    README.md


## FEATURES

- All Jade files in `app\templates` are compiled into `build/templates` keeping their directory structure
- All Coffee files in `app\assets\scripts` are compiled and concatenated into `build/js/app.js`
- All Less files in `app\assets\styles` are concatenated into `build/css/app.css`
- All JS files in the `bower_components` folder are concatenated into `build/js/lib.js`
- All CSS files in the `bower_components` folder are concatenated into `build/css/lib.css`
- `index.jade` is compiled/copied to `build/index.html`
- A static server is run at port 9000 with livereload support
- When any HTML, JS or CSS file in the build folder changes, they are autoreloaded on the browser

-----

## Prerequisites

- node.js [http://nodejs.org/][4]
- npm [http://www.npmjs.org/][3]

## Usage

### Developing
Go to the generator folder and exec the following command:

```javascript
npm link
```

Yeoman will now recognize the package, just run yo initios-yeoman
from another folder and you can test this generator on local.

Workaround: If "npm link" is not working for you try with

```javascript
npm link generator-initios-yeoman
```

Build your app

```javascript
mkdir my-app && cd my-app && yo initios-yeoman
```

Launch the server and start watching files changes

```javascript
gulp launch
```

Now you can open your browser on `http://localhost:9000` and see your app working.



[1]: http://gulpjs.com/
[2]: http://bower.io/
[3]: http://www.npmjs.org/
[4]: http://nodejs.org/


## Functional Tests

Functional tests are run with Protractor.

For easier testing workflow install protractor globally:

```shell
npm install -g protractor
```

This will install 2 command line tools:
* protractor: run protractor tests
* webdriver-manager: Start/Stop Selenium

### Running tests
If is the first time you need to install selenium webdriver.
On windows run
```shell
node node_modules/protractor/bin/webdriver-manager update
```

On UNIX run
```shell
./node_modules/protractor/bin/webdriver-manager update
```

Finally, to run the tests:
```shell
protractor conf.js
```

By default it will be runned with PhantomJs (headless browser)
For debugging use chrome with:

```shell
protractor conf.js --browser chrome
```

Check the protractor API (which is on top of Selenium):
http://angular.github.io/protractor/#/api
