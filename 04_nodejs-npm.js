// nodejs

// npm

npm init -y

// модули рекомендуется устанавл в проект локально
// глобальная установка необходима для работы с модулями из консоли

// кол-во зависимотей
npm list -g --depth=0 // глобально
npm list --depth=0    // локально

npm config get prefix // показывает директорию куда устанавливаются пакеты npm с флагом -g


// install

// то что нужно для разработки >> devDependencies
npm install --save-dev modulename
npm i -D modulename

// то что нужно для ui >> dependencies
npm install --save modulename
npm i -S modulename


npm link modulename  // прилинковывает пакет из глобального в локальный

npm repo modulename  // открывает репозиторий модуля


// modules

// в nodejs встроена система CommonJs

  // index.js
  const sum = require('./modules/sum');
  console.log(sum(1, 2)); // >> 3

  // sum.js
  modules.exports = function (a, b) {
    return a + b;
  };


// работа в теминале
| node                   // начало работы с nodejs
_ (нижнее подчёркивание) // выводит предыдущий результат
shift + Enter            // перевод строки
cntrl + C                // выход

node index.js            // выводит результат в исполняемом файле index.js
