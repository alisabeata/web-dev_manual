// node js


// запуск сервера
const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world');
}).listen(3000);

console.log('Сервер запущен на localhost:3000; нажмите Ctrl+C для завершения')


// req — запрос от клиента серверу
// res — то что отдаём по запросу



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



// route-example.js
const app = require('express')();

app.use(function (req, res, next) {
  console.log('\n\nalways'); // вызывается всегда
  next();
});

app.get('/a', function (req, res) {
  console.log('/a: route terminated');
  res.send('a'); // если происходит отправка, дальнейшие миддлвары не отрабатывают
});

app.get('/b', function (req, res, next) {
  console.log('/b: route not terminated');
  throw new Error('b failed');
  // если сгенерированна ошибка, то в параметры след обработчика первым приходит error 
});

app.use('/b', function (err, req, res, next) {
  console.log('/b: error detected and pass on');
  next(err);
});

app.get('/c', function (req, res, next) {
  console.log('/c: error thrown');
  next();
});

app.use(function (err, req, res, next) {
  console.log('unhandled error detected: ' + err.message); // вызовется только если сгенерирована ошибка через throw new Error()
  // эта ошибка сработает, если передан err в некст next(err);
  res.send('500 server error');
});

app.use(function (req, res) {
  console.log('route not handled'); // вызывается если не будет авброшено иск через throw new Error()
  res.send('404 not found');
});


// - nodemon
npm i -D nodemon
// утилита для запуска сервера с рестартом сервера при изменении файлов
// запуск через package json вместо npm сервера


// утилиты для работы с сервером
"dependencies": {
  "body-parser" : v,             // распарсивает post-запросы
  "connect-mongo",               // подключение для хранения сессий в mongo
  "cookie-parser",               // cookie парсер
  "debug",                       // хранения сессий
  "express",
  "express-session",             // хранения сессий express
  "formidable",                  // для загрузки картинок
  "jsonfile",                    // для чтения json файлов
  "mongoose",                    // для работы с mongo DB
  "morgan",                      // используется для регистрации деталей запроса
  "nodemailer",                  // для работы с отправкой писем
  "nodemailer-smtp-transport",   
  "serve-favicon"
}


// пример app.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const favicon = require('favicon');
const logger = require('logger');
const cookieParser = require('cookieParser');
const bodyParser = require('bodyParser');
const app = express();
const server = http.createServer(app);

const jsonfile = require('jsonfile');
const fileVersionControl = 'version.json';
const currentStatic = require('./gulp/config').root;
const config = require('./config');

// сетап / view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// подключение статика
app.use(express.static(path.join(__dirname, currentStatic)));

// (!) необходимо создать дирекорию routes с вложенными index.js, mail.js, admin.js
app.use('/', require('./routes/index'));
app.use('/contacts', require('./routes/contacts'));
app.use('/admin', require('./routes/admin'));

// обработчики ошибок (в миддлварах)
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

server().listen(3000, 'localhost');
server.on('listening', function () {
  jsonfile
    .readFile(fileVersionControl, function (err, obj) {
      if (err) {
        console.log('');
        console.log('Сервер остановлен');
        process.exit(1);
      } else {
        app.locals.settings = {
          suffix: obj.suffix,
          version: obj.version
        }
        console.log('');
        
        // создание папки для загрузки картинок
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
        
        console.log('Express started on port %s');
      }
    });
});


// in config.json
{
  "upload": "public/upload",
  "mail": {
    "subject": "Mail title",
    "smtp": {
      "host": "smtp.gmail.com",
      "port": 465,
      "secure": true,
      "auth": {
        "user": "mail@test.com",
        "pass": "password12345"
      }
    }
  }
}


// in ./routes/index
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  const obj = {
    title: 'Main page'
  };
  
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/index', obj);
});

module.exports = router;


// in ./routes/blog
router.get('/blog', function (req, res) {
  ...
});
  
  
  
  
// - отправка писем
	
// https://nodemailer.com/about/

npm i nodemailer --save

// ограничение в день не больше 500 писем

router.post('/', function (req, res) {
  if (!req.body.name || !req.body.email || ! req.body.text) {
    return res.json({status: 'укажите данные'});
  }
  
  const transporter = nodemailer.createTransport(config.mail...);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: req
      .body
      .text
      .trim()
      .slice(0, 500) + `/n Отправлено с <${req.body.email}>`
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json({status: 'произошла ошибка при отправке'});
    }
    return res.json({status: 'отправлено'});
  });
});

	
// - отправка файлов (new FormData())
  
npm i formidable --save
	
// upload.js
export default function (url, data, callback) {
  const xhr = new XMLHttpRequest();
  
  xhr.open('POST', url, true);
  xhr.onload = function () {
    const result = JSON.parse(xhr.responseText);
    callback(result.status);
  };
  xhr.send(data);
}

// admin.js
import fileUpload from './upload';
  
const formUpload = document.querySelector('#upload');
  
function prepareSendFile(event) {
  event.preventDefault();
  
  const resultContainer = formUpload.querySelector('.status');
  const formData = new FormData();
  const file = document.querySelector('#file-select').files[0];
  const name = document.querySelector('#file-desc').value;
  
  formData.append('photo', file, file.name);
  formData.append('name', name);
  
  resultContainer.innerHTML = 'uploading...';
  fileUpload('/admin/upload', formData, function (data) {
    resultContainer.innerHTML = data;
    formUpload.reset();
  });
}
  
formUpload.addEventListener('submit', prepareSendFile);
  
  
// routes/admin.js
const express = require('express');
const router = express.Router();

router.get('/upload', function (req, res) {
  const obj = {
    title: 'Admin page'
  };
  
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/admin', obj);
});
  
router.post('/upload', function (req, res) {
  const form = new formidable.IncomingForm();
  
  form.uploadDir = path.join(process.cwd(), config.upload); // process.cwd() директория где находимся в текущий момент
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.json({status: 'не удалось загрузить картинку'});
    }
    if (!fields.name) {
      return res.json({status: 'не указано описание картинки'});
    }
    
    fs.rename(file.photo.path, path.join(path.join(config.upload, files.photo.name)), function (err) {
      if (err) {
        fs.unlink(path.join(config.upload, files.photo.name)); // удаляет файл который лежит в config.upload
        fs.rename(files.photo.path, files.photo.name); // переименовывает
      }
      res.json({status: 'картинка загружена'});
    });
  });
});

module.exports = router;
  
  
// (!) pm2 защищает node от падения, следит за обработкой ошибок, если возникает необработанная ошибка перезагружает приложение
// https://github.com/Unitech/pm2
