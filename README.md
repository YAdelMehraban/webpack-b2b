# webpack-b2b
This repository contains codes needed for webpack preso on B2B at Readify

[webpack](http://webpack.github.io/) is an awesome module bundler which came to the party a bit late after [gulp](http://gulpjs.com/) and [grunt](http://gruntjs.com/).

I am trying to provide a kinda step-by-step guide on how to simply setup webpack and get familiar with it.

So, let's get started:

## Step 1: initial setup
I am using VS code but you can use any other editor. Open up your empty folder with VS code and then open a terminal.
Remember you've got to have installed node globally.

Now run `npm init`, you'll be asked a couple of questions which you can easily bypass by pressing `enter`.

## Step 2: install the necessary packages
All of webpack modules and loaders would be installed as dev dependency as they are not required for deployment.

1- [webpack](http://webpack.github.io/), you may install the webpack globally but for the time being I am going to set it up as dev dependency.
```bash
npm i -D webpack webpack-dev-server
```

### [loaders](https://webpack.github.io/docs/loaders.html)
We will need the bellow loaders for the purpose of this guideline.
You might be wondering what is a loader. Well to put it simply (from webpack), loaders allow you to pre-process files as you require() or “load” them. Loaders are kind of like “tasks” are in other build tools, and provide a powerful way to handle frontend build steps. Loaders can transform files from a different language like, CoffeeScript to JavaScript, or inline images as data URLs. Loaders even allow you to do things like require() css files right in your JavaScript!

now run this command:
```bash
npm i -D style-loader css-loader sass-loader node-sass file-loader url-loader postcss-loader babel-loader babel-core babel-preset-es2015 eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import extract-text-webpack-plugin

npm i bootstrap --save
```

Don't worry, I will go through these one by one:

* *[babel-loader](https://www.npmjs.com/package/babel-loader)* This package allows transpiling JavaScript files using Babel and webpack.

Here i am assuming, you will be using ES6 and have some idea on [babel](https://babeljs.io/) which is a compiler for writing next generation JavaScript. We will be doing our setup using babel6, which is its latest version and differs a lot from its older versions.

Since babel-loader depends number of modules from babel, we will be installing all of them together. Make sure to read about them ..         
* *[babel-core](https://www.npmjs.com/package/babel-core)* .
* *[babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015)* - Babel preset for all es2015 plugins.

Following loaders are all used to deal with static resources like css, fonts, images, etc.

* *[style-loader](https://www.npmjs.com/package/small-style-loader)* Adds CSS to the DOM by injecting a `<style> tag`.
* *[css-loader](https://www.npmjs.com/package/css-loader)* this modules helps loading css files and preparing them for being used by other loaders such as style-loader.
* *[file-loader](https://www.npmjs.com/package/file-loader)* By default file-loader returns the MD5 hash of the file's contents with the original extension.
* *[url-loader](https://www.npmjs.com/package/url-loader)* url-loader is a good starting point and it's the perfect option for development purposes as you don't have to care about the size of the resulting bundle. It comes with a limit option that can be used defer image generation to file-loader after certain limit is reached. This way you can inline small files to your JavaScript bundles while generating separate files for the bigger ones.
* *[sass-loader](https://www.npmjs.com/package/sass-loader)* Adds support for compiling sass files and preparing them for css-loader.
* *[postcss-loader](https://www.npmjs.com/package/postcss-loader)* postcss loader for webpack to post-processes your CSS with postcss plugins.

I think you can easily find the use of other loaders on the [webpack](https://webpack.github.io/docs/) documentation repository.

Cool, I think we are now ready to jump to creating necessary files for our project.

We will start by creating a couple of empty folders as the structure of the project.

* public: is used to serve all the files that are accessible to outside world.
* src: contains our js files.
* css: contains our sass files.

For start create a file named `app.js` in the `src directory` with the bellow code:
```javascript

import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.scss';
import MyClass from './dependency';

document.write('<h2> This is a demo..! </h2>');

document.write(MyClass.getTemplate());

console.log('app loaded');

```   

Next thing would be to create the `MyClass` inside the `dependency.js`, I called it dependency to show you it is just a file that is being imported into another and webpack deals with those beautifully.

```javascript
const MyClass = class Me {
  static getClassName() {
    return Me.name;
  }

  static getTemplate() {
    return `
    <div class="row">
      <div class="col-xs-6">
        <label>Name:</label>
        <input class="form-control" type="text" />
      </div>
      <div class="col-xs-12 link">
        <a href="#"><h2>Me</h2></a>
      <div>
    </div>`;
  }
};

export default MyClass;

console.log('dependency loaded');

```

Then we add the `scss` file inside `css` folder:

```javascript
$body-bg: steelblue;

body {
  background-color: $body-bg; 

  h2 {
    font-size: 2em;
    color: white;
  }

  label {
    color: white;
  }

  a {  
      display: flex;
  }
}
```

Now is time to create the main entry point of the app so called `index.html` inside `public` folder:

```javascript
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack demo</title>
    <link rel="stylesheet" type="text/css" href="./public/assets/style.css" />
  </head>
  <body class="container">    
    <script type="text/javascript" src="./public/assets/bundle.js"></script>
  </body>
</html>
```

We are pretty much done with the files, so lets create the configuration required by webpack.

Create a file called `webpack.config.js` in the root:

```javascript
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  context: path.resolve('src'),
  entry: './app',
  output: {
    path: path.resolve('public/'),
    publicPath: '/public/assets/',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.es6']
  },
  devServer: {
    contentBase: 'public'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      { test: /\.js?$/, loader: 'eslint-loader', exclude: 'node_modules' }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
```

I'll explain the configuration file section by section.
1- The most important parts are entry points and output of webpack.
* context: this flag defines the root of the source files (for us js files). This is used to prevent repeating the full path while referring to source files.
* entry: this can be one or multiple files, depending on which one you use you should alter your output respectively.
* output: this is an object containing a couple of key/values. The first one is path which indicates which directory should be used for output.
Second is the `publicPath` which specifies the public URL address of the output files when referenced in a browser. For loaders that embed `<script>` or `<link>` tags or reference assets like images, `publicPath` is used as the `href` or `url()` to the file when it’s different then their location on disk (as specified by path).
* resolve: Options affecting the resolving of modules, extensions is an array of file extensions that should be parsed by webpack.
* devServer: these are the configuration of `devServer` used for customising how devServer should work. I am using `contentBase` for pointing the root of public as entry point.