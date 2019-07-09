// network


// https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html


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


// запуск локального хоста на мобильном
// https://medium.com/@wiekatz/testing-web-applications-running-on-localhost-with-an-iphone-7db6258b8f2

// On the iPhone, go to Settings → Safari → Advanced and activate the switch “web inspector”
// Connect the phone to your MacBook using a lightning-to-USB cable
// On the MacBook, open up Safari and go to Develop → {{NAME_OF_YOUR_IPHONE}} and select “Connect via Network”
// Open up a terminal and run the command “ifconfig” to see the list of current network interfaces and take note of the IP address of the last entry in the list
ifconfig
// >> inet 169.254.145.56   // example

// On your phone, in Safari, use the IP address to access your locally running website. For example, if you use create-react-app, instead of going to http://localhost:3000, with the IP I got here, the address to use is http://169.254.145.56:3000 (don’t forget the http:// prefix)

// You can now inspect the website displayed on your iPhone with your MacBook’s Safari by selecting it in the Develop menu
