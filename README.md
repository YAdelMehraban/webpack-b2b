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
