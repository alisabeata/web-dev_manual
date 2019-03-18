// network


// - restAPI
// модель описания данных
// стандарт описания запросов (https://habr.com/ru/post/351890/)
// (Representational State Transfer) — передача состояния представления
// HTTP-запрос, обычно get или post называется rest-запросом
// большинство RESTful-реализаций используют стандарты, такие как HTTP, URL, JSON и XML


// - websockets
const webSocket = new WebSocket('ws://localhost/echo');

webSocket.onopen = function () {
  webSocket.send('hello websocket');
};

webSocket.onmessage = function (event) {
  console.log(event.data);
};

webSocket.onclose = function (event) {
  console.log('websocket is closed');
};

// https://socket.io/
// обёртка (поллифил) для работы с веб сокетами
