// svg


// xml основа svg

// inkscape опенсорс редактор
// https://inkscape.org

// онлайн редактор
// https://vectr.com



// - библиотеки для работы с svg

// - greensock          https://greensock.com/
// - highcharts         https://www.highcharts.com/
// - snap               http://snapsvg.io/
// - vivus              https://maxwellito.github.io/vivus/
// - lazy line painter  http://lazylinepainter.info/
// - svg js             https://svgjs.com/
// - bonsai             https://bonsaijs.org/
// - velocity           http://velocityjs.org/
// - raphael            http://dmitrybaranovskiy.github.io/raphael/
// - walkway            https://github.com/ConnorAtherton/walkway


// animation: greensock
// combine: bonsai, snap, svg js, velocity
// lines: vivus, lazy line painter, walkway
// graphs: highcharts
// поддержка 7-8ie: raphael


// d3 https://d3js.org/ отдельный фреймворк для визуализации данных



// - базовые фигуры
// rectangle
// circle
// ellipse
// triangle
// polyline
// polygon
// text

// - attr
// fill — заливка
// stroke — цвет линии
// stroke-width — толщина линии
// stroke-linecap — сглаживание линии
// stroke-linejoin — сглаживание угла
// viewBox — размер холста

// - elements
// <g id="someId"> — группировка
// <use xlink:href="someId"> — повторное исп элемента
// <defs> — графика внутри defs не отображается, но на неё можно ссылаться через <use>
// <symbols> — для группировки элементов, графика внутри не отображается пока не будет вызвана с помощью <use>, элемент исп свою систему координат, на его основе собирают svg спрайты
// <path> — в аттр d полностью описывается путь построения https://codepen.io/anthonydugois/pen/mewdyZ (SVG Path Builder)


// - viewBox

// выравнивание по центру
<svg width="200" height="200" viewBox="50 50 100 100">
  <circle cx="100" cy="100" r="50" style="fill:green;" />
</svg>
  
  
// - preserveAspectRatio
// пример: https://codepen.io/Krabaton/pen/RVPQje
  
preserveAspectRatio="xMinYMin meet"
preserveAspectRatio="none" // сброс пропорций, полностью вписывает графику в контейнер

// meet — вписывает по контуру viewBox
// slice — срезает
// xMinYMin — левый верхний
// xMidYMid — середина
// xMaxYMax — правый нижний



// - gradients

// градиент для текста
<linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#00f" />
  <stop offset="50%" stop-color="#0f0" />
  <stop offset="100%" stop-color="#f00" />
</linearGradient>
  
<text x="500" y="300" class="text" fill="url(#gradient)">Text</text> 


// - filters

// размытие по гауссу, stdDeviation степень размытия
<filter id="filterBlur">
  <feGaussianBlur stdDeviation="3"></feGaussianBlur>
</filter>
  
<image x="" y="" width="..." height="..." xlink:href="" style="filter:url(#filterBlur)">
  
// - css animation
// пример: https://codepen.io/Krabaton/pen/zoLzzP
  
  
// - stroke-dasharray / stroke-dashoffset
// рисование/заполнение линий (штриховка с анимацией)
// пример: https://codepen.io/Krabaton/pen/VpZyRb
<circle r="45" cx="50%" cy="50%"  transform="rotate(-90 55 55)" class="circle__second circle-15"/>
  
.circles:hover .circle-15 {
   stroke-dasharray: 42.39 282.6;
}
// 282.6    длина окружности C = πd
// 42.39    282.6 * 0.15 (15%)

stroke-dasharray: [нарисовать] [пропустить];


