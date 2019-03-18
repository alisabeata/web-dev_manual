// NodeJS

// - websockets

// https://socket.io/
// обёртка (поллифил) для работы с веб сокетами


// - чат

// in index.html
...
  // физически socket.io не существует
  // необходим для подключения сокета после коннекта к серверу
  <script src="/socket.io/socket.io.js"></script>
</body>
  
// in server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = reqiure('socket.io').listen(server);

server.listen(3000, () => {
  console.log('server is running on port 3000');
});

// подкл статических ресурсов
app.use(express.static(__dirname + '/static'));

let users = {}; // в идеале нужна база данных для хранения пользователей, в примере сохн в объект

// подключение пользователя
io.sockets.on('connection', client => {
  // добавление юзера в список юзеров
  users[client.id] = 'аноним';
  broadcast('user', users);
  broadcast('system', 'в чат вошёл новый пользователь');
  
  // подписка на сообщения юзера
  client.on('message', message => {
    try {
      // проверка не сменил ли пользователь имя
      if (users[client.id] !== message.name) {
        broadcast('system', `пользователь ${users[client.id]} сменил имя на ${message.name}`);
        users[client.id] = message.name;
      }
      broadcast('message', message);
      broadcast('user', users);
    } catch (err) {
      console.log(err);
      client.disconnect();
    }
  });
  
  client.on('disconnect', data => {
    broadcast('system', `${users[client.id]} покинул чат`);
    delete users[client.id];
    client.broadcast.emit('user', users);
  });
  
  // создание пользовательских событий
  function broadcast(event, data) {
    client.emit(event, data); // emit выполнение события (отправить себе)
    client.broadcast.emit(event, data); // broadcast.emit отправка события всем подключённым пользователям (отправить всем)
  }
});


// in main.js (client side)
const socket = io();

socket.on('connect', data => {});
socket.on('user', data => {
  // когда приходит юзер
});
function msg(name, message) {
  // создание шаблона для вставки в чат
}
socket.on('message', data => {
  // когда сообщение приходит с сервера
  msg(data.name, data.message);
});
socket.on('system', data => {
  // системные сообщения (о статусе пользователя)
});
window.onunload = function () {
  socket.disconnect();
};
btn.addEventListener('click', () => {
  ...// обработка отправки сообщения
  socket.emit('message', {
    message: text,
    name: name
  });
});


// https://c9.io
// интегированная среда
// с хостингом
