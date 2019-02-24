// node js


// запуск сервера
const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world');
}).listen(3000);

console.log('Сервер запущен на localhost:3000; нажмите Ctrl+C для завершения')


// req — запрос от клиента серверу
// res — то что отдаём по заросу



// - File System

// удаление файла
const fs = require('fs');

fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});


// переименование файла
const fs = require('fs');

fs.rename('/tmp/foo', '/tmp/bar', (err) => {
  if (err) throw err;
  console.log('rename complete');
});


// - Path
const path = require('path');

path.extname('index.html'); // returns '.html'

path.join('/foo', 'bar', 'baz/name'); // returns '/foo/bar/baz/name'

path.parse('/home/user/dir.file.txt'); 
// returns 
//{
//  root: '/',
//  dir: '/home/user/dir',
//  base: 'file.txt',
//  ext: '.txt',
//  name: 'file'
//}


// (!)
path.join('/foo', 'bar', 'baz/name', 'somename', '..');
// returns '/foo/bar/baz/name'
// 'somename' не вошло в результат, тк '..' означает вернуться на директорию назад


// - Events
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occured!');
});

myEmitter.emit('event');


// - Crypto
const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('i love cupcackes')
                   .digest('hex');

console.log(hex); // c0fa1bc00....8e



// - Express
// фреймворк для Node.js
// https://expressjs.com/ru/

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});


// - Основные части
// URI/URL (https://somename.com/)
// HTTP methods (get, post, put, delete)
// HTTP status codes (200 OK, 404 Not Found)


// - Основы маршрутизации
// маршрутизация определяет как приложение отвечает на клиентский запрос 
// к конкретному адресу (эндпоинту, URL) и методу запроса (get, post и тд)

// структура маршрута
app.method(path, handler);
// app — экземпляр express
// method — метод запроса http
// path — путь на сервере
// handler — функция, выполняемая при сопоставлении маршрута

app.get('/', function (req, res) {
  res.send('root');
});


// - методы ответа
res.download()    // предложение загрузки файла
res.end()         // завершение процесса ответа
res.json()        // отправка ответа в JSON
res.jsonp()       // отправка ответа JSON  с поддержкаой JSONP
res.redirect()    // перенаправление ответа
res.resend()      // вывод шаблона представления
res.send()        // отправка ответа различных типов
res.sendFile()    // отпарвка файла в виде потока ответов
res.sendStatus()  // установка кода состояния ответа и отправка представления в виде строки в качестве тела ответа



// - express.Router

// rootpage
const somepage = require('./somepage');
app.use('/somepage', somepage);

// somepage
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('somepage home');
});

router.get('/about', function (req, res) {
  res.send('about somepage');
});

module.exports = router;



// (!) можно использовать pug (препроцессор) в express

// index.pug
html
  head
    title= title
  body
    h1= message
    
// установка движка
app.set('view engine', 'pug')

// рендер страницы 'index' (index.pug) с указанием заголовка и контента
app.get('/', function (res, req) {
  res.render('index', {title: 'Some title', message: 'Some content'});
});



// - Middleware
// имеют доступ к объекту запроса (req) и ответа (res)
// след функция в очереди обработки ответа обознач next
// исп для распарс post запросов, cookie-парсер, сессии (авторизация)
const app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});



// - получение параметров запросов

// GET
// http://localhost:3000/test?name=somename
app.get('/test', function (req, res) {
  console.log(req.query.name);
});

// POST {"name": "somevalue"}
// http://localhost:3000/test
app.post('/test', function (req, res) {
  console.log(req.body.name);
});

// Роутинг
// http://localhost:3000/tets/somename
app.get('/test/:name', function (req, res) {
  console.log(req.params.name);
});
