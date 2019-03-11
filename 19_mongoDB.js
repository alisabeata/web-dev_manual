// mongoDB

// https://www.mongodb.com/


// mongoDB состоит из баз данных, которые состоят из коллекций
// коллекции состоят из документов
// каждый документ состоит из полей

// желательно устанавливать в корневую директорию
// устанавливается только на 64-разрядные системы


// - mongoDB-клиенты
// robomongo
// https://robomongo.org/
// studio3t
// https://studio3t.com/


// - основные команды
show dbs                                  // список всех баз данных
use <db_name>                             // перейти в базу (если нет, то с созданием)
show collections                          // список всех коллекций в текущей базе
db.<collection>.find()                    // список документов в коллекции
db.<collection>.find({status:'active'})   // список документов с условиями
db.<collection>.insert({name:'Name', surname:'Surname'}) // добавление данных в коллекцию
db.<collection>.remove({somefieled: 'text'})      // удаление
db.<collection>.update({age: 100}, {name: 'Name'}) // данные будут полностью заменены у одного документа, поле age исчезает
db.<collection>.update({age: 100}, {$set:{name: 'Name'}}) // модификатор $set позволяет менять только поле name
db.<collection>.updateOne(...)  // как и предыдущ, доступно в версии >3.2
db.<collection>.update({age: 100}, {$set:{name: 'Name'}}, {multi: true}) // множественные обновления
db.<collection>.updateMany(...) // как и предыдущ, доступно в версии >3.2

                           
// - подключение в node.js
                           
// retrieve / извлечение
const MongoClient = require('mongodb').MongoClient;

// connect to the db
MongoClient.connect('mongodb://localhost:27017/exampleDb', function (err, db) {
  if (!err) {
    console.log('connected');
  }
});
// (!) :27017 порт по умолчанию в монго


// - mongoose
// помогает получать данные
// это ODM (Object Document Mapper - объектно-документный отобразитель)
// позволяет вам определять объекты со строго-типизированной схемой, соответствующей документу MongoDB
// предоставляет набор возможностей для создания и работы со схемами
// доступные типы: String, Number, Date (объект ISODate), Buffer (двоиная информация, например изображение), Boolean, Mixed, ObjectId, Array

npm i mongoose

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // connected
});

// схемы
const mongoose = require('mongoose');
const Scheme = mongoose.Scheme;
const BlogScheme = new Scheme({
  title: {
    type: String,
    required: [true, 'Укажите заголовок статьи']
  },
  body: {
    type: String,
    required: [true, 'Укажите содержимое статьи']
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Укажите дату публикации']
  }
});

mongoose.model('blog', BlogScheme);


// поиск
const Person = mongoose.model('Person', someSchema);

// {'name.last': 'Doe'} что ищем
// здесь 'name occupation' выбор полей которые нужны (name, occupation)
// в колбэке возвр данные
Person.findOne({'name.last': 'Doe'}, 'name occupation', function (err, person) {
  if (err) {
    return handleError(err);
  }
  console.log('%s %s is %s.', person.name.first, person.name.last, person.occupation);
});
Person.find({'name.last': 'Doe'}, 'name occupation', function (err, docs) {});
Person.find({'name.last': 'Doe'}, 'name occupation').exec(function (err, docs) {});


// добавление
const Person = mongoose.model('Person', someSchema);
const subject = new Person({name: 'Jhone'});

subject.save(function (err) {
  if (err) {
    return handleError(err);
  }
});
// or
Person.create({name: 'Jhone'}, function (err, subject) {
  if (err) {
    return handleError(err);
  }
});


// редактирование
const query = {name: 'Jhone'};

Model.update(query, {name: 'Alice'}, options, callback);
Model.update(query, {$set: {name: 'Alice'}}, options, callback);

Person.findOne({name: 'Jhone'}, function (err, person) {
  if (err) {
    return handleError(err);
  }
  
  person.name = 'Alice';
  person.save();
});


// удаление
Model.remove({name: 'Alice'}, function (err, person) {
  if (err) {
    return handleError(err);
  }
});
