// pug


// https://pugjs.org


// - cтруктура
templates/             # Корневая директория с шаблонами .pug
  blocks/              # Папка с подключаемыми блоками
  helpers/
      mixins.pug       # Примеси
      variables.pug    # Переменные
  includes/            # Инклюды
      form.pug
  layouts/             # Шаблоны сайта
      default.pug      # Шаблон по умолчанию
  pages/               # Страницы
      index.pug
  partials/            # Основные части сайта
      footer.pug
      head.pug
      header.pug
      scripts.pug



// - сборка
// используется для подключения инкдлюдов, хедера, футера и пр.
include somename

// для внедрения контент в расширяемый шаблон
extends ../layouts/default

// для добавления строк кода в определённое место шаблона
block scripts



// - теги, классы и идентификаторы

// классы и идентификаторы пишутся в начале, а не в атрибутах. Указывать тег div не нужно, т.к. он используется по умолчанию
.someclass
nav.nav.nav_pos_left
#someid

// идентификатор ставится после классов
.someclass.someclass_dark#someid
.someclass#someid

// - атрибуты
input.someinput(type="email" name="email" required)
input.somecheckbox(
  type="checkbox" 
  name="types" 
  value="type_1" 
  data-text="Sooooo long text here" 
  checked
)


// строчные элементы можно записывать на одной строке через двоеточие :


// - комментарии в коде

    // Этот комментарий попадёт в HTML.
    //- Этот комментарий не попадёт в HTML.

    <!--[if IE]>
      meta(name='imagetoolbar' content='no')
      meta(name='msthemecompatible' content='no')
    <![endif]-->

    <!--noindex-->
      Это содержимое не будет индексироваться поисковиком.
    <!--/noindex-->


    
// - циклы

// перебор массива с each
each item, index in items
  .wrapper
    .block= item
    .index= index
    .length= item.length
    

// перебор массиыва с циклом for
- for (let i = 0; i < items.length; i++)
  .wrapper
    .block= item[i]
    .index= i
    .length= item.length


// с while
- let i = 0;

while i < items.length
  .wrapper
    .block= item
    .index= index
    .length= item.length
  
  
// - работа с объектами
  
- const obj = {val: 'prop', val2: 'prop2'};

// многострочная запись
- 
    const obj = {
      val: 'prop',
      val2: 'prop2'
    };

each value, key in obj
  .obj
    .key= key
    .value= value

// через знак равно все знач присваиваются с экранированием (те заменяются элементы на код символа)
// чтобы убрать экранирование необходимо исп !=
.key!= key

// так же можно исп перевод в строковое значене
.key Текст #{key}
// так же можно исп перевод в строковое значене (без экранирования)
.key Текст !{key}
// вывод значений в атрибуты
.title(data-title=`${title}`)

// для пага доступно св-во 
- console.log()


// - условия

// if else
if item.title === 'somename'
  .title
else
  .other-title
  
// case when
case item.title
  when 'somename'
    .title 
  when 'othername'
    .other-title



// - includes
include ../sections/header
  


// - create layout
// layout общий шаблон сайта
touch layout.pug

// in layout.pug
    html
    ... 
    block title    // block title вставл название страницы и подкл файла
      title Тайтл по-умолчанию

    include ../sections/header

    .main-wrapper
      block content // уникальный контент

// in somepage.pug
    extends ../layout
    
    block title
      title Заголовок // присвоение уникального тайтла

    block content     // наполнение контента
      .page
        h1 Some title
        .page__inner
        ...
    

// - mixins

// init
mixin somename
  h1 Some title

// render
+somename  // выводит <h1>Some title</h1>

// with attr
mixin somename (val)
  h1 #{val}
  // или h1= val

+somename('имя заголовка') // выводит <h1>имя заголовка</h1>


// for menu

mixin menu(className, items, activeItem)
  ul(class=`${className}`)
    each item, ind in items
      li(class=`${className}__item` + (ind === activeItem ? ` ${className}__item_active` : ''))
        a(class=`${className}__link` href="/") #{item}

+menu('menu', ['главная', 'новости', 'статьи'], 0)


// вывод однотипных элементов

ul.social
  each social in ['fb', 'inst']
    li.social__item
      a(class=`social__link social__link_${social}` href="")
        img.social__img(src=`img/icons/${social}.png`)

