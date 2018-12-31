// sass (SCSS)


// SCSS диалект Sass, в котором исп фигурные скобки, точки с запятой, в сас нет

// scss даёт возможность быстрого перехода на препроцессор с существующими css файлами


// - nesting (вложение селекторов)
nav {
  ul {
    ...
  }
  
  li {
    ...
  }
}
   
    
// - склеивание слелекторов (&) 
.class {
  ...
  
  &:hover { // >>> .class:hover
    ...
  }
    
  &__elem { // >>> .class__elem
    ...
  }
}
  
    
// - выражения
width: 100px - 20; // >>> 80px
// единицы должны быть одинаковыми, те нельзя указывать px и em в одно и то же время
    

// - переменные
$varName: '...';
// переменная объявл со знака $, начинаться может с буквы или _ 
// можно хранить строки, цвета, единицы, массивы обозн: (item1, item2)
   
.class {
  color: $varName;
}
    
// область видимости переменной ограничивается блоком {}
    

// - функции
// все функции: https://sass-lang.com/documentation/Sass/Script/Functions.html
    
.class {
  color: lighten(#000, 20%); // >>> color: #333333 
}
                 
.class {
  background: rgba(#000, .5); // >>> background: rgba(0, 0, 0, .5);
}
                
// кастомная функция
@function inc($num) {
  $res : $num + 20px;
  @return $res;
}
.class {
  width: inc(100px); // >>> 120px
}
  
// @debug $res; выводит результат в консоль
@function inc($num) {
  $res : $num + 20px;
  
  @debug $res;
  
  @return $res;
}
  
  
// - mixins
  
// @mixin создние примиси
@mixin mixinName($var1, $var2) {
  color: $var1;
  background: $var2;
}
  
// @include вызов
.class {
  @include mixinName(#fff, #ccc);
}
                     
// параметр по умолчанию указывается через :
@mixin mixinName($var1, $var2: #000) {...}

// передача нескольких параметров
@mixin transition($params...) {
  transition: $params;
}
.class {
  @include transition(opacity .3s, background 1s);
}
  
  
// - @extend
// реализует наследование
.model {
  background: #ccc;
}
.class {
  color: red;
  @extend .model; // <<<
}
  
// redult: 
.model, .class {
  background: #ccc;
}
.class {
  color: red;
}
  
  
// плейсхолдер на примере clearfix
// по сути представляет собой примесь, но подключается через экстенд
%clearfix () {
  &::before, &::after {
    content: "";
    display: table;
  }
  
  &::after {
    clear: both;
  }
}
 
.block {
  @extend %clearfix;
}
  
  
  
// - условия
@mixin input($width) {
  width: $width;
  border: 1px solid red;
  
  @if $width < 100px {
    text-align: center;
  } @else {
    text-align: left;
  }
}
 
.input-text {
  @include input(300px);
}

// с тернарным опратором
// if(условие, true, false);
@mixin input($width) {
  width: $width;
  border: 1px solid red;
  text-align: if($width < 100px, center, left);
}

  
// - циклы
  
@each $social in (fb, tw, inst) {
  .social__item_#{$social} {
    background: url('img/#{$social}.png');
  }
}
  
// массивы можно выносить в переменные
$socialList: (fb, tw, inst);
  
@each $social in $socialList {
  ...
}
  
// исп для генерации св-в
$sides: left, right, bottom, top;
  
@each $side in $sides {
  $color: black;
  
  @if $side == right {
     $color: red;
  }
  
  .triangle__#{$side} {
    border-#{$side}-color: $color;
  }
}
 
 
// - import
 
// in main.scss
   $backgroundColor: #ccc;
 
   @import "header";
   @import "footer";
 
// in header.scss
   .header {
     background: $backgroundColor;
   }
     
// переменные досупны только для файлов, которые подключены ниже объявления
 
// sass globe
// модуль, который позволяет делать импорт папками
@import "blocks/**/*;
