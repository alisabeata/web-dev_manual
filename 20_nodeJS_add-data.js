// NodeJS

// логин
// чат с веб-сокет


// - добавление пользователя
// in user.js
const mongoose = require('mongoose');
const crypto = require('crypto'); // для шифрования
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  login: {
    type: String,
    required: [true, 'укажите логин']
  },
  password: {
    type: String,
    required: [true, 'укажите пароль'],
    set: password => password === '' 
      ? password 
      : crypto
        .createHash('md5') // md5 тип шифрования
        .update(password)
        .digest('hex')
  }
});

// in addUser.js
// консольное приложение для создания нового пользователя
const mongoose = require('mongoose');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const config = require('config');

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
    user: config.db.user,
    pass: config.db.password
  })
  .catch(err => {
    console.error(err);
    throw err;
  });

require('./models/db-close');

let login = '';
let password = '';

// запись логина пароля
rl.question('логин: ', answer => {
  login = answer;
  rl.question('пароль: ', answer => {
    password = answer;
    rl.close();
  });
});

// когда ввод завершён
rl.on('close', () => {
  // подкл модель пользователя
  require('./models/user');
  // создание экземпляра пользователя
  const User = mongoose.model('user');
  const adminUser = new User({login: login, password: password});
  
  // поиск юзера с таким логином
  User
    .findOne({login: login})
    .then(user => {
      if (user) {
        throw new Error('такой пользователь уже существует');
      }
      // запись юзера
      return adminUser.save();
    })
    .then(user => console.log('ok'), err => console.error(err.message))
    .then(() => process.exit(0));
});


// in app.js (см 18_nodeJS.js)
...
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

... // after cookieParser
app.use(session({
  secret: 'secret',
  key: 'keys',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
...
require('./models/user');


// in login.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

const isAdmin = (req, res, next) => {
  // проверка на админский доступ
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/');
};

router.get('/', isAdmin, function (req, res) {
  const obj = {
    title: 'авторизация'
  };
  
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/login', obj);
});

router.post('/', isAdmin, (req, res) => {
  if (!req.body.login || !req.body.password) {
    return res.json({status: 'укажите логин и пароль'});
  }
  // получить модель пользователя и зашифр пароль
  const Model = mongoose.model('user');
  const password = crypto
    .createHash('md5')
    .update(req.body.password)
    .digest('hex');
  // поиск юзера с таким логином и паролем
  Model
    .findOne({login: req.body.login, password: password})
    .then(item => {
      if (!item) {
        res.json({status: 'логин или пароль введены неверно'})
      } else {
        req.session.isAdmin = true;
        res.json({status: 'авторизация успешна'});
      }
    })
});

module.exports = render;
