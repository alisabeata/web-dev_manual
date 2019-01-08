// css grid

//https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout

display: grid;

grid-template-columns: 200px 200px 200px; // 3 колонки по 200px
grid-template-columns: 1fr 1fr; // >> 2 колонки по одной фракции
grid-template-columns: repeat(2, 1fr 2fr); // повторить два раза две колонки по 1 и 2 фракции (4 чередующиеся колонки)
grid-template-columns: minmax(150px, 250px); // первая колонка тянется от 150px до 250px


grid-template-rows: 150px 150px; // высота первой и второй строки по 150px

grid-auto-rows: 100px; // высота колонок по умолчанию
grid-auto-rows: minmax(150px, auto); // auto позволяет растягивать блок под контент


grid-gap: 20px; // расстояние между колонками
grid-column-gap: 20px; // боковое расстояние
grid-row-gap: 20px; // вертикальный отступ



// смена порядка отображения (отсчёт по колонкам, второй блок под третьим)
grid-auto-flow: column; 
grid-template-rows: 200px 200px; // с grid-auto-flow: column; овечает за кол-во колонок


// responsive
grid-template-columns: repeat(auto-fill, 200px); // автозаполнение
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); // автозаполнение с тянущимися колонками
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); // с auto-fit элементы не перескакивают, тянутся плавно


// отодвигает первый блок на один
.item:nth-child(1) {
  grid-column-start: 2; 
}

// растягивает первый блок на два
.item:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 3;
}

// растягивает элемент на всю ширину
.item:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: -1;
}
// аналогично
.item:nth-child(1) {
  grid-column: 1 / -1;
}

// второй элемент (:nth-child(2)) на второй колонке (grid-row: 2)
.item:nth-child(2) {
  grid-column: 1;
  grid-row: 2;
}

// третий элемент (:nth-child(3)) на второй колонке (grid-row: 2) занимает две средних фракции
.item:nth-child(3) {
  grid-column: 2 / 4;
  grid-row: 2;
}

// grid-row — явное указание строки


// выравнивание
justify-items: stretch; // по умолчанию (растянутые блоки)
justify-items: start; // блоки не растягиваются, отобр как инлайн-блок с выравниванием вначале
justify-items: end; // в конце
justify-items: center; // в центре
