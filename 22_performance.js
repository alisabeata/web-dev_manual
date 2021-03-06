// performance


// general

// Speed Index на стабильном соединении должен быть меньше 1000
// Speed Index на 3G должен быть меньше 3000
// First Paint (Start Render) на стабильном соединении должен происходить не позже 1 сек. после ответа с сервера
// First Paint (Start Render) на 3G должен происходить не позже 3 сек. после ответа с сервера
// В идеале страница должна быть готова к работе в течении ~300-500 мс (не считая начального ответа)
// Если страница загружается дольше 1 сек. высока вероятность, что пользователь не дождется полной загрузки
// Если страница загружается дольше 10 сек. очень высока вероятность что пользователь не вернется никогда
// Полная загрузка страницы должна происходить максимум за 5-7 сек

// Конверсия достигает пика при скорости загрузки страницы за 2-3 сек
// Конверсия растет на 26% при уменьшении времени загрузки страницы с 3-4 сек. до 2-3 сек
// Bounce rate растет на 50% при увеличении времени загрузки страницы с 2-3 сек. до 3-4 сек


// network

// Основной контент (который приходит с первых ответом от сервера; one RTT render) должен умещаться в 14 Кб
// Минимизировать количество и размеры запросов к серверу (SVG, JavaScript бандлы, спрайты и т.п.)
// Сжимать статические ресурсы (GZip)
// DNS origins должны быть одинаковые для большинства ресурсов

// Учитывать скорость реакции на мобильных устройствах (Radio + Carrier Latency):
// - Control Plane ~50мс-2500мс (происходит только 1 раз при просыпании устройства)
// - User-pane + Core-network ~50мс-500мс

// Использовать dns-prefetch, prefetch, prerender, subresource и preconnect
<link rel="dns-prefetch" …>
<link rel="prefetch" …>
<link rel="prerender" …>
// для часто используемых ресурсов и динамических элементов (следить за трафиком)
<link rel="subresource" …>
// для установки соединения заранее
<link rel="preconnect" …>
	
// Не использовать редиректы
// Чтобы избегать предупреждения о «небезопасных ресурсах», когда HTTPS-страница ссылкается на non-HTTPS ресурсы, можно использовать независимые от протокола URL’ы
<script src="//domain.com/foo.js"></script>

// Минимизировать количество и кэшировать AJAX-запросы

// (!) Откладывать загрузку Google Analytics, Mixpanel и т.п.
// Минимизировать SPOF (Spof-o-matic, Webpagetest)
// Минимизировать количество социальных виджетов на странице (0 likes argument)

// Responsive графика экономит до 70% трафика
// Использовать progressive JPEG
// Использовать <img src set="…" …>
<img src set="…" />
// Использовать <picture …> для art directed-изображений
<picture …>
// Избегать {display: none} на изображениях
	
// Ограничить использование несистемных шрифтов
// Оптимизировать подключаемые шрифты (Font Squirrel)
// Использовать FontFaceObserver для оптимизации загрузки сторонних шрифтов
	
	
	
// interaction
	
// Задержка ввода (input latency) на мобильных устройствах
// - Hardware ~100 мс. (~55мс минимум, ~120мс максимум).
// - Software ~300 мс.
	
// Для обхода задержки в 300 мс. на мобильных браузерах можно использовать
// {touch-action: none} на ссылках и кнопках; отключает pan, zoom и т.п. жесты
{touch-action: none}
// {touch-action: manipulation} отключает double tap и т.п
{touch-action: manipulation}
// viewports
<meta name="viewport" content="…width=device-width">
<meta name="viewport" content="…user-scalable=no">

// Все динамические изменнения и отклики должны укладываться в ~0-300 мс (можно проверять в Chrome DevTools Timeline)
// - Отклик интерфейса в ~0-100 мс воспринимается как моментальный
// - Отклик интерфейса в ~300-1000 мс может восприниматься как «притормаживающий»
// - Отклик интерфейса больше чем за 1 сек. провоцирует смену контекста и потерю внимания пользователя
	
// По возможности не делегировать события которые могут провоцировать заддержку ввода (touchstart, touchmove, touchend, mousedown, click)
	
	
// rendering / page performance
	
// Критичное значение имеет чистый HTML-код без бесполезных элементов
// Порядок элементов так же имеет большое значение
// По возможности держать значение fps близко или больше 60. Не меньше 30 (https://developer.chrome.com/devtools/docs/rendering-settings)
// Избегать запросы блокирующие парсер или рендеринг. Тестировать с помощью Filmstrip View на PageSpeedTest
// - Декларация CSS блокирует рендеринг
// - Декларация JavaScript блокирует и парсер, и рендеринг, поэтому нужно использовать директивы defer async и размещать вызовы в конце документа
<script async…></script>
<script defer…></script>

// По возможности избегать больших JavaScript фреймфорков
// По возможности использовать CSS containment чтобы уменьшить количество relayout и repaint-событий (https://habr.com/ru/post/309042/), имеет смысл применять к off-screen-элементым, сторонним виджетам
contain: none | strict | content | [ size || layout || style || paint ]

// Излишние repaint-события вредят на любой платформе, но особенно на мобильных. Там это выражается не только в замедлении работы страницы, но и в быстрой разрядке аккумулятора

// Не использовать {background-position: fixed}. Это провоцирует repaint-события
// Избегать paint storms — они основная причина медленной работы страницы. Проверять страницу с помощью Chrome DevTools > Continuous Paint Mode и Paint Rectangles
// При необходимости выделять элементы в собственный графический слой с помощью {transform: translateZ(0)} или {will-change: transform}
{transform: translateZ(0)}
{will-change: transform}

// Избегать DOM thrashing
// - Использовать DocumentFragment при манипуляции DOM для минимизации reflow и repaint-событий
// - Проверять событие Invalidate Layout в Chrome DevTools Timeline
// - Не использовать конструкцию $(selector).html(), вместо нее использовать innerHTML или методы DOM

// По возможности не масштабировать изображения на фронтенде
// Избегать сложных CSS-селекторов (AMP)
// Впервую очередь стараться использовать декларативные CSS-анимации
// Не аннимировать CSS-свойства которые вызывают reflow или repaint-события
// Для анимации в JavaScript использовать requestAnimationFrame
// По возможности не анимировать в потоке (использовать {position: absolute} и т.п.)
// Один «кадр» анимации должен укладываться в 16 мс
// Использовать пассивные event listeners для scroll-событий
// Колбэки scroll-событий выполнять вне event listener (debounce) и использовать requestAnimationFrame
// Каждое scroll-событие должно быть оправданным
// По возможности избегать (особенно на «мобильных платформах») touchstart и scroll событий
// Использовать {position: sticky} для фиксированного контента вместо привязки к scroll-событиию

// Если не получается избежать touchstart или scroll, необходимо снижать их эффекет на производительность
// - Не делегировать touchstart, привязывать напрямую, «глубоко» в DOM
// - Привязывать touchstart или scroll к существующим элементам, не привязывать заранее
// - Отвязывать «ненужные» touchstart или scroll события
// - Оптимизировать функции внутри событий (requestAnimationFrame)

// Отключать сложные события «по наведению» во время скролла ({pointer-events: none})
// На «мобильных устройствах» количество графических слоев не должно быть больше 30
// Подгружать контентные изображения по принципу Lazy Load с помощью JavaScript и/или <img lazyload> (IE11)
// Избегать {text-rendering: optimizeLegibility}, вмечто этого по-возможности использовать {text-rendering: auto}
// Отрисовывать заранее динамические элементы для более быстрой реакции ({opacity: 0; pointer-events: none;})


// critical rendering path

// Для эффективной приоритезации загрузки страницы, ресурсы можно разбить на 3 группы
// - Ядро (загружается моментально) — Критический (преимущественно) HTML-контент
// - Дополнительный контент (подгружается по событию DomContentLoad) — JavaScript, остальные стили CSS, графика
// - Экстра контент (подгружается по событию onLoad) — Шрифты, тяжелая графика, сторонние виджеты и контент, аналитика, реклама

// ~14 Кб это максимальных размер для критических (above the fold) HTML, CSS и JavaScript-ресурсов

// Критический контент должен быть доступен с первым ответом от сервера (one RTT render):
// - Inline CSS в теле HTML-документа
// - Inline SVG в теле HTML-документа (логотип)
// - Base64 картинки в теле HTML-документа

// Остальные компоненты подгружаются по событиям DomContentLoad и onload (loadcss, loadjs)
// Использовать плейсхолдеры для ещё не загруженного контента (skeleton screens)
// Декларировать JavaScript в конце документа и использовать директивы async и defer
<script async…></script>
<script defer…></script>
// Блокировать большие фоновые картинки в CSS и иницировать их загрузку сменой класса на <body>
// Откладывать загрузку сторонних шрифтов
// Использовать FontFaceObserver для загрузки сторонних шрифтов, потому что он не блокирует парсер и позволяетя избежать FOUT
// Вместо скриптов социальных сетей использовать прямые ссылки



// - рекомендации
// Чем больше ресурсов и чем они тяжелее, тем дольше загрузка страницы и выше процент отказов пользователей
// для оптимальной работы должно получится не более 25 баллов в сумме (книга Барбара Бермс в книге Lean Websites)
// - фоновое видео              - 15
// - видеоконтент / гиф         - 10
// - hero-image                 - 6
// - шрифт (уникальный)         - 4
// - среднее изображение        - 3
// - шрифт (основной, 4 начерт) - 2
// - маленькая картинка         - 1
// - векторная иллюстрация      - 1
// - векторная ui-картинка      - 0
// - растровая ui-картинка      - 0



// - цели
// <= 200kb uncompressed js (initial)
// <= 100kb uncompressed css (initial)
// <= 6kb first call HTTP/1
// <= 20kb first call HTTP/2
// coverage >=90% (см вкладку coverage в дев тулз)


// - стиль кода
// (!) замыкания замедляют выполнение кода
// лучше не создавать вложенные функции, те делать более плоскую структуру
// то же относится к вложенным классам
// bad
function a() {
  function b() {}
}
// good
function a() {}
function b() {}

// - css
// по возможности не исп наследование, nth-child
// лучше исп bem


// - вызывает перерисовку (reflow)
// ресайз окна
// изменения шрифта
// изменение контента
// добавление/удаление стилей
// добавление/удаление классов
// добавление/удаление элементов
// вычисление/изменение размера или позиционирования и тд

// (!) перерисовка происходит, когда изменения элементов влияют на видимость, а не на раскладку. Например, opacity, background-color, visibility и outline
// (!) влияние перекомпоновки еще больше. Под этим понимается перерасчёт позиций и размеров всех элементов, что приводит к переотрисовке части или всего документа
// (!) каждый кадр анимации приводит к перекомпоновке
// (!) перерисовка - блокирующая операция (все процессы ост кроме неё)

// - способы избежать рефлоу
// менять классы как можно ниже по дом дереву
// не менять инлайн-стили
// удалять сложные анимации из потока (добавить позишн аюсолют/фиксед или transform: translateZ(0))
// компромисс в плавности ради производительности (js-анимации)
// минимизировать dom-манипуляции
// уменьшить кол-во ресайз-событий
// не исп таблицы


// (!) перформанс реакта в режиме разработки и режиме прода отличается по производительности в пользу последнего

// (!) анимацию лучше выносить на отдельный слой

// - имеет свой отдельный слой
// рутовый элемент
// позиционированный элемент (абсолют, фиксед)
// элемент с css трансформацией
// элемент с оверфлоу

// (!) можно исп св-во will-change чтобы сообщить браузеру о возможных изменениях элемента, не стоит злоупотреблять им, тк может вызвать обратный эффект
el {
	will-change: transform;
}
// можно управлять из js
el.addEventListener('mouseenter', () => {
	el.style.willChange = 'transform';
});
// рекомендуется удалять св-во после окончания анимации
el.addEventListener('animationend', () => {
	el.style.willChange = 'auto';
});

// у элементов доступны события на стадии анимации
el.addEventListener('transitionend', () => {});


// (!) HTTP/2 значительно быстрее HTTP/1
// обрабытывает параллельные запросы


// tools

// REACT
// - source-map-explorer
// утилита для оценки производительности
// https://www.npmjs.com/package/source-map-explorer

// - (!!! TO USE) webpack-bundle-analyzer
// https://www.npmjs.com/package/webpack-bundle-analyzer

// - fastdom
// исп для анимаций
// фрейминг без requestAnimationFrame
// + к производительности
// имеет смысл исп при прямом обращении к дом (те не реакт)
// https://github.com/wilsonpage/fastdom


// - purifycss
// минификация css
// https://purifycss.online/
// https://github.com/purifycss/purifycss


// - react babel tools
// хорошая практика не включать проп тайпс в продакшн сборку реакт проектов
// https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types

// трансформирует компоненты в функции (реакт)
// https://www.npmjs.com/package/babel-plugin-transform-react-class-to-function

// конвертирует jsx в инлайн объекты (реакт)
// https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements

// сохраняет отдельно jsx узлы
// https://github.com/dropbox/ts-transform-react-constant-elements


// - prepack
// отптимизатор js
// https://prepack.io/




// - webpack splitting
// динамический импорт созаёт отдельный бандл, с возможностью дальнейшей загрузки по опр событию
import Listener from './listener';
const getModal = () => import('./src/modal');

Listener.on('someEventForModalLoading', () => {
  getModal().then(module => {
    const madalTarget = document.getElementById('modal');
    
    module.initModal(madalTarget);
  });
});


// загрузка подключаемых модулей

// before
import {TweenMax} from 'gsap';

// after
const getTweenMax = () => import('gsap');



// загрузка модуля с параметром
const getStyleButton = (color) => import(`./src/buttn-${color}`);

getStyleButton('red');


// magic comments
// https://webpack.js.org/api/module-methods#magic-comments

// Single target
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
);

// Multiple possible targets
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */ 
  /* webpackPreload: true */
  `./locale/${language}`
);
import(/* webpackIgnore: true */ 'ignored-module.js');

// webpackPrefetch: true -- уменьшает делей при отрисовке компонента
// https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c
