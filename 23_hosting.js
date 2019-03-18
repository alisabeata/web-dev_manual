// hosting

// с установленной убунту на сервере

// apt-get - менеджер пакетов

ssh root@111.111.11.111  // вход
apt-get update           // обновление убунту
apt-get install git      // установка git
apt-get install curl     // установка curl (для установки node)

// установка node
// https://github.com/nodesource/distributions/blob/master/README.md

apt-get install nodejs   // установка nodejs

// (!) вносить изменения под root'ом плохая практика

adduser web              // добавление пользователя с именем web
adduser web sudo         // добавление админских прав

// установка mongodb
// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition-on-ubuntu

// создание запуска mongodb при запуске сервера
sudo nano /etc/init.d/mongod
      // в нём
      #!/bin/bash
      service mongod start
       
// добавление созданного скрипта в автозагрузку
sudo update-rc.d mongod defaults

// создание директории и загрузка репозитория
mkdir www
cd www
git clone -b node https... namefolder
cd namefolder

// установление зависимостей и запуск проекта
npm i

// in config.json
// необходимо переписать имя хоста
...
"http": {
  "post": 80,
  "host": "0.0.0.0" // 0.0.0.0 запуск сервера без привязки к хосту
}

npm start // запуск node index.js


// настройка автоматического запуска проекта при запуске системы
// с исп pm2
sudo npm i pm2 -g
pm2 start ./index.js --name="namefolder"  // запуск
pm2 save            // сохранение добавленных проектов
pm2 startup ubuntu  // генерация скрипта автозапуска (далее ввести предложенную строку из консоли)

// перезапуск сервера
sudo reboot
