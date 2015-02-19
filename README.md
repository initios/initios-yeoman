# Initios Yeoman

This is a yeoman generator for an AngularJS project using Gulp[1], Bower[2] and NPM[3].

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
    node_modules/
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



## Support

  [1]: http://gulpjs.com/
  [2]: http://bower.io/
  [3]: http://www.npmjs.org/
  [4]: http://nodejs.org/


