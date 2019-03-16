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



// - passport js
// http://www.passportjs.org/
// плагин для авторизации (локально или через соцсети)


// in routes/index.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('index', {});
});

router.post('/submit', (req, res, next) => {
  passport.authenticate('loginUser', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({status: 'укажите правильный логин и пароль'})
    }
    req
      .logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json({status: 'аутентификация пройдена'});
      })
  });
})(req, res, next);

router.post('/submit', (req, res) => {
  req
    .session
    .destroy();
  res.json({status: 'сессия удалена'});
});
  
module.exports = router;


// in routes/private.js
const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .send('авторизуйтесь');
}

router.get('/', isLoggedIn, (req, res) => {
  res.render('private', {});
});

module.exports = router;


// in config-passport.js
const passport = require('passport');
const locakalStrategy = require('passport-lockal').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const config = require('./config');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Model = mongoose.model('user');
let user = {};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, user);
});

// локальная стратегия
passport.use('loginUsers', new LocalStrategy((username, passport, done) => {
  const newpassword = crypto
    .createHash('md5')
    .update(password)
    .digest('hex');
  Model
    .findOne({login: username})
    .then(item => {
      user = {
        username: item.login,
        password: item.password,
        id: item._id
      };
      if (username === user.username && newpassword === user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
}));

// стратегия github
passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));


// in config.js
// параметры указываются из настроек гитхаба
module.exports = {
  github: {
    clientID: 'f2131231....',
    clientSecret: 'a0233jxsf...',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }
}


// in app.js
...
const passport = require('passport');

...
require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());
...
// маршруты
app.use('/', require('./routes/index'));
app.use('/private', require('./routes/private'));
app.use('/auth', require('./routes/github'));
