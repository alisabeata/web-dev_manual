// stylus


// http://stylus-lang.com/


// - структура стилей
stylus/
   base/
       base.styl
       fonts.styl
       normalize.styl
   blocks/
       article.styl
       ...
       search.styl
       signin.styl
   helpers/
       mixins.styl      # вспомогательные функции
       variables.styl   # переменные
   partials/
       footer.styl
       header.styl
       
       
       
// один блок = один файл
// файл со стилизацией блока должен называться так же, как сам блок
       
       
// - синтаксис
       
// исп вложенность с & (амперсанд), тк будет видна зависимость и иерархическое дерево классов
.project
   // …
 
   &__name
      // …
 
   &__description
      // …
       
// нельзя миксовать табы и пробелы (стили не скомпилируются)
// разб группы св-в пробелами для лучшей читабельности
// рекоменд пропускать {} : ; (компилируется без них)
// не исп &- для описания имен составных блоков, вызывает проблемы с поиском (.project &-type (bad), .project .project-type (good))
       
       
// - последовательность элементов блока  
.block
   // …
    
   // Медиаквери
   +below(640px) / @media (min-width: 640px)
      // …
   
   // Псевдоэлементы
   &::after
      // …
   
   // Псевдоклассы
   &:first-child
      // …
              
   // Элементы
   &__element
      // …
 
   // Модификаторы
   &_key-val
      // …
               
   // Псевдоклассы, влияющие на элементы
   &:first-child &__element
      // …
       
   // Модификаторы, влияющие на элементы
   &_key_val &__element
      // …
   
   // Дочерние элементы
      // …
   
   
// - переменные
// рекомендуется выносить в переменные цвета, название шрифтов, ресурсы в data-uri
   
$blackColor = #080A07
$yellowColor = #FFFE8F
$peachColor = #FFC8B4
 
$robotoFont = 'Roboto', sans-serif


// - миксины

// Подсчет em и %

// a — необходимое значение
// b — значение родительского блока
 
// em
countEm(a, b)
   a = unit(a, px)
   b = unit(b, px)
   c = a / b
   return unit(c, em)
 
// persents
countPersent(a, b)
   a = unit(a, px)
   b = unit(b, px)
   c = a / b * 100
   return unit(c, '%')
   
   
   
// - media queries in sytlus
// https://github.com/jescalan/rupture
