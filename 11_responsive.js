// адаптивная/responsive вёрстка


<meta name="viewport" content="width=device-width, initial-scale=1.0">

// - относительные единицы

%      // проц от высоты родителя
em     // пропорционально от размера шрифта родительского блока
rem    // пропорционально от размера шрифта на корневом теге <html>

//  viewport units (1 ед === 1% соотношения)
vw     // viewport width относительно ширины окна браузера
vh     // viewport height относительно ширины окна браузера
vmin   // относительно наименьшей стороны соотношения ширина:высота
vmax   // относительно наибольшей стороны соотношения ширина:высота
  


// - медиазапросы
@media screen and (max-width: 768px) {}

@media[ключевое слово] screen[тип носителя] and[логический оператор] (max-width: 768px)[медиа функции]

// -- тип носителя
all          // все устройства (по умолчанию)
print        // принтеры
screen       // экран монитора

braille      // устр на системе брайля (для слабовидящих)
embossed     // принтеры (печать по системе брайля)
handheld     // кпк
projection   // проекторы
speech       // речевые синтезаторы (речевые браузеры и тд)
tty          // устр с фикс размером символов (телетайпы и тд)
tv           // телевизоры


// -- медиа функции
// ширина
width (min-width, max-width)

// ориентация экрана
// landscape (горизонтальная)
// portrait (вертикальная)
@media screen and (orientation: landscape) {}

// плотность пикселей
// retina: 1 логический px === 4 физических px 
// проверка
resolution (min-resolution, max-resolution) // опр плотность точек на дюйм (более 150 dpi повышенная плотность)
device-pixel-ratio (min-device-pixel-ratio, max-device-pixel-ratio) // на ретине равно 2, на андройде могут быть дробные значения

// for retina
@media screen and (-webkit-min-device-pixel-ratio: 1.5),
screen and (min-resolution: 144dpi) {}



// - брейкпоинты
1200px   // desktop/десктоп (HD)
992px    // laptop/лэптоп (ноутбук 11")
768px    // tablets/планшет
480px    // phones/смартфон



// - типы лайаута
// static
// rubber
// adaptive (изменяется по брейкпоинтам)
// responsive (adaptive + rubber)


// - media query with sass
@mixin desktop {
  @media (max-width: 1200px) {
    @content;
  }
}
 
.class {
  @include desctop {
    font-size: 16px;
  }
}
  
// result
@media (max-width: 1200px) {
  .class {
    font-size: 16px;
  }
}

 
// grid system
// https://github.com/at-import/Singularity
  
// определяет dpi online
// http://dpi.lv/
  
  
  
// - responsive images
//https://developer.mozilla.org/ru/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
 
<img srcset="img-320w.jpg 320w,
             img-480w.jpg 480w,
             img-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="img-800w.jpg" alt="">
       
       
// условие для dpi
<img srcset="img-fon@2x.jpg 2x,
             img-fon@3x.jpg 3x"
     src="img-fon.jpg" alt="">
       
// or
<picture>
  <source meida="(max-width: 1000px)" srcset="img-fon@3x.jpg">
  <source meida="(max-width: 900px)" srcset="img-fon@2x.jpg">
  <img src="img-fon.jpg">
</picture>
  
// полифилл для srcset
// https://scottjehl.github.io/picturefill/

  
// - image-set css
.picture {
  background: -webkit-image-set(url('...') 2x);
}
  