// animation


// - оптимизация
// проверка затраты ресурсов при анимации
// DevTools > Rendering > Paint Flashing

// смещение лучше делать для блоков с позишн фиксед/абсолют (для тех которые вне потока, тк смешаются отдельно без перерисовки всего документа)

// с translateZ(0)/translate3d рендеринг происходит на видеокарте, рендеринг элемента происходит один раз
// c исп top/margin происходит пересчёт элемента


// - parallax (mousemove)
const wrapper = document.getElementById('parallax');
const layers = wrapper.children;

const parallax = event => {
  const initialX = (window.innerWidth / 2) - event.pageX;
  const initialY = (window.innerWidth / 2) - event.pageY;
  
  [].slice.call(layers).forEach((layer, i) => {
    const divider = i / 100;
    const positionX = initialX * divider;
    const positionY = initialY * divider;
    const bottomPosition = (window.innerWidth / 2) * divider;
    const layerStyle = layer.style;
    const transformString = `translate3d(${positionX}px, ${positionY}px, 0)`;
    
    layerStyle.transform = transformString;
    layerStyle.bottom = `-${bottomPosition}px`;
  });
};

window.addEventListener('mousemove', parallax);



// - css parallax (scroll)

.parallax {
  ...
  perspective: 1000px;
}


// translateZ от 0 до -300px для 7 слоёв
// с пропорциональным увеличением scale
$layers: 7;

@for $layerNum from $layers throw 1 {
  .parallax__layer:nth-child(#{$layerNum}) {
    $currentLayer: $layers - $layerNum;
    $perspective: $currentLayer * -50px;
    $scale: $currentLayer * .5 + 1;
                             
    // @debug $perspective; >> выводит в лог значение
                             
    transform: translateZ($perspective) scale($scale);
  }
} 


/*
.parallax__layer:nth-child(1) {
  transform: translateZ(0) scale(1);
}
.parallax__layer:nth-child(2) {
  transform: translateZ(-50px) scale(1.5);
}

...

.parallax__layer:nth-child(7) {
  transform: translateZ(-300px) scale(4);
}
*/



// - js parallax (scroll)

const parallax = () => {
  return {
    move: function (block, windowScroll, rate) {
      const shift = - windowScroll / rate + '%';
      const transformString = `translate3d(0, ${shift}, 0)`;
      const style = block.style;
      
      style.transform = transformString;
      style.webkitTransform = transformString;
    }
  };
};

window.addEventListener('scroll', () => {
  let wScroll = window.pageYOffset;
  
  parallax.move(bg, wScroll, 35);
  parallax.move(element, wScroll, 20);
  ... 
});

  
  
// - background blur

.blur__form {
  filter: blur(20px);
}

const blur = () => {
  const wrapper = document.querySelector('.blur__form-wrapper');
  const form = document.querySelector('.blur__form');
  
  return {
    set: function () {
      const imgWidth = document.querySelector('.blur__bkg').offsetWidth;
      const posLeft = - wrapper.offsetLeft;
      const posTop = - wrapper.offsetTop;
      const blurStyle = form.style;
      
      blurStyle.backgroundSize = `${imgWidth}px auto`;
      blurStyle.backgroundPosition = `${posLeft}px ${posTop}px`;
    }
  };
};
  
  
window.addEventListener('resize', blur.set);
  
  
  
// - отрисовка svg stroke при скролле 

.svg .group {
  stroke-dasharray: 1200; // картинка должна быть нарисована одной линией
  stroke-dashoffset: 1200; // стартовое значение, картинка не видна, тк попадает в пробел пунктира
}
  
// анимация stroke-dashoffset к нулю создаёт эффект отрисовки линии
  
  
const drawStroke = () => {
  const svg = document.getElementById('svg-element');
  const svgPath = document.querySelectorAll('#svg-element path');
  const windowMargin = window.innerHeight / 3;
  const svgRect = svg.getBoundingClientRect();
  const svgPos = svgRect.top;
  
  return {
    draw: function (wScroll) {
      const startAnimate = wScroll - svgPos + windowMargin;
      const pixelRemainder = svgPos - wScroll;
      const persentsRemainder = 100 - Math.ceil(pixelRemainder / windowMargin * 100);
      const persentsDraw = 1200 / 100 * persentsRemainder; // 1200 значение stroke-dasharray
      
      if (startAnimate >= 0) {
        const drawAmount = 1200 - persentsDraw;
        
        if (drawAmount > 0) {
          svgPath.forEach(item => item.style.strokeDashoffset = drawAmount);
        }
      }
    },
    erase: function (wScroll) {}
  };
};
  
window.addEventListener('scroll', () => {
  let wScroll = window.pageYOffset;
  
  drawStroke.draw(wScroll);
});
