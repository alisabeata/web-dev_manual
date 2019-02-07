// flexbox

.container {
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  display: -ms-flexbox;
}


//  к блоку
// display: (flex, inline-flex)
// justify-content: (flex-start, flex-end, center, space-between, space-around)
// flex-direction: (row, row-reverse, column, column-reverse)
// align-items: (stretch, flex-start, flex-end, center, baseline)

//  к элементу
// align-self: (stretch, flex-start, flex-end, center, baseline)
// order: (< -1, 0, 1 <)
// flex: 1 1 auto;
//     flex-grow: 1  // отношение между элементами
//     flex-shrink: 1  // допустимая пропорция при сжатии контента
//     flex-basis: auto // миним размер элемента при котором не работает св-во flex-shrink




// выравнивание по центру
.block {
  justify-content: center;
  align-items: center;
}

// разбиение элементов (часть влево, часть вправо)
.element:nth-child(3) {
  margin-left: auto;
}

 


// - оси (axis)
// у флекс-контейнера всегда есть две оси 
// main-axis (горизонтальная)
// cross-axis (вертикальная)


// - смена расположения осей
// main-axis
.container {
  flex-direction: row;
}
// cross-axis
.container {
  flex-direction: column;
}

// - смена направления осей
// слева направо (default)
.container {
  flex-direction: row;
}
// справа налево
.container {
  flex-direction: row-reverse;
}


// - выравнивание главной оси (расположение слева-справа)
.container {
  justify-content: flex-start;
}

// flex-start (default) — выравнивание блоков по левому краю, в начале строки
// flex-end             — выравнивание блоков по правому краю, в конце строки
// center               — выравнивание по центру
// space-between        — выравнивание justify
// space-around         — выравнивание justify с отступами по краям


// - выравнивание поперечной оси (расположение сверху-снизу)
.container {
  align-items: stretch;
}

// stretch (default) — блоки растянуты на всю высоту
// flex-start        — блоки прижаты к верхнему краю
// flex-end          — блоки прижаты к нижнему краю
// center            — блоки выровняны по центру с сохранением высоты каждого блока
// baseline          — по базовой линии текста внутри блоков


// - многострочный контейнер
// flex-wrap (wrap, nowrap, wrap-reverse) перенос элементов
// align-container (flex-start, flex-end, center, space-between, space-around, stretch) расположение блоков в линии


// - порядок элементов
// order (<-1 left, 0 default, 1< right)
