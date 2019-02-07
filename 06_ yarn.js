// yarn

// https://yarnpkg.com

// работает быстрее чем npm
// можно совмещать работу с npm на одном проекте
// работает так же с package.json и уст модули в node_modules

yarn init -y                   // создание package.json
yarn add moduleName[@version]  // установка пакетов
yarn upgrade moduleName        // обновление модуля
yarn remove moduleName         // удаление модуля
yarn  || yarn install          // установка зависимостей
yarn list --depth=0            // показывает все зависимости, ключ --depth=0 обозначает уровень вложенности

// имеется возможность работать офлайн, в этом случае yarn показывает закешированные пакеты, доступные для установки
yarn add moduleName[@номер закешированной версии] --offline