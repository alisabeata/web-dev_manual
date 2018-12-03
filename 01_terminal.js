// terminal

// https://github.com/0nn0/terminal-mac-cheatsheet/tree/master/russian
// http://osxh.ru/content/spisok-terminalnyh-komand-os-x

!!        // запускает предыдущую команду
cd        // переход
cd ~ || ~ // переход в каталог пользователя
ls -a     // содержимое каталога вкл скрытые файлы
cp        // копирование
mv       // переиманование (| mv file.js new.js), перемещение (| mv file.js foldername)
rm -r     // удаление папки
mkdir     // создать папку
touch     // создать файл
clear     // очистить консоль

// создание нескольких файлов и папок
mkdir -p start/app/{css,js}
cd start
touch .gitignore gulpfile.js app/{index.html,css/main.css,js/main.js}

echo строка > filename.smth // записть в файл (> перезаписывает)
echo строка >> filename.smth // добавить в файл (>> добавляет)
cat filename.smth           // вывод содержимого в консоль

// консольные редакторы
vim   // :wq (w -- записать, q -- выйти)  :x (выйти)
nano 


// ssh

| ssh LOGIN@ADDRESS -p PORT    // ssh login@138.201.10.01 -p 8000



