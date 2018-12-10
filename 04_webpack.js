// webpack

// https://webpack.js.org/concepts/#entry

// лоадеры выполняются снизу вверх, справа налево
// вебпак v2+ поддерживает es6 модули


// quick start with webpack
mkdir webpack-app
cd !$   ||   cd webpack-app
yarn init -y
git init
touch .gitignore
echo "node_modules" > .gitignore
echo "other files" >> .gitignore
git add .
git commit -m "init"
git push

// рекомендуется локальная установка
yarn add webpack -D

cat package.json //  проверить зависимости

touch webpack.config.js


// запуск webpack by npm/yarn
// package.js
{
  ...
  "scripts": {
    "start": "webpack"
  }
}

yarn run start


// config
mkdir source
touch source/{index.js,menu.js}

yarn add html-webpack-plugin -D  // html плагин

// in webpack.config.js
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    const PATHS = {
      source: path.join(__dirname, 'source'),
      build: path.join(__dirname, 'build')
    };
    
    module.exports = {
      entry: PATHS.source + '/index.js',
      output: {
        path: PATHS.build,
        filename: '[name].js'
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Title text'
        })
      ]
    };


// webpack watch
webpack --watch
{
  ...
  "scripts": {
    "start": "webpack",
    "serv": "static build",
    "build": "webpack --watch"
  }
}

// serv
yarn add node-static -D
{
  ...
  "scripts": {
    "start": "webpack",
    "build": "webpack --watch",
    "serv": "static build",
  }
}
yarn run static

// dev server
yarn add webpack-dev-server -D
// webpack-dev-server исп только для dev среды, перед продакшеном нужно сделать build
{
  ...
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack"
  }
}
  
// static работает с билд, webpack-dev-server с памятью, потому последний исп только для dev

  
  
// разделение на prod и dev
{
  ...
  "scripts": {
    "start": "webpack-dev-server --env development",
    "build": "webpack --env production"
  }
}

const common = {
  entry: PATHS.source + '/index.js',
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Title text'
    })
  ]
};

const developmentConfig = {
  devServer: {
    stats: 'errors-only',
    port: 9000 
  }
};
  
  
module.exports = function(env) {
  if (env === 'production') {
    return common;
  }
  if (env === 'development') {
    return Object.assign(
      {},
      common,
      developmentConfig
    );
  }
};
  
  
// для склеивания вместо Object.assign() исп webpack-merge
yarn add webpack-merge -D


// разделение config на модули (для склейки исп webpack-merge)
mkdir webpack
touch webpack/{devserver.js,pug.js}

// in devserver.js
    module.exports = function () {
      return {
          devServer: {
          stats: 'errors-only',
          port: 9000 
        }
      }
    };
  
// in webpack.config.js (main)
    const path...
    ...
    const merge = require('webpack-merge');
    const pug = require('./webpack/pug');
    const developmentConfig = require('./webpack/devserver');
  
    const common = marge({  // <<< merge
        ...
      },
      pug()  // pug here
    );
    
    ...
    
    module.exports = function(env) {
      if (env === 'production') {
        return common;
      }
      if (env === 'development') {
        return merge([   // <<< merge
          common,
          developmentConfig  // developmentConfig here
        ]);
      }
    };