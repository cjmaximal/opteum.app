Opteum Test Work
===============

**Стек технологий:**

 1. Бэкенд - API ([Laravel 5.3](https://laravel.com/))
 2. Бэкенд - WS ([Node.js](https://nodejs.org/))
 3. Фронтенд - [Laravel 5.3](https://laravel.com/) и [Vue.js 2.0](http://vuejs.org/)

----------

Демо
-----
![Пример](https://github.com/cjmaximal/other-opt-t-w/raw/master/opteum-test-work.gif)

Установка
---------

 1. Установить [Vagrant](https://www.vagrantup.com/docs/installation/) и [VirtualBox](https://www.virtualbox.org/)
 2. Установить PHP (5.6 или выше) и [Composer](https://getcomposer.org/doc/00-intro.md)
 2. скачиваем архив, либо в консоли `git clone https://github.com/cjmaximal/opteum.app.git`
 2. Выполнить в консоли `composer install`, прежде перейдя в директорию проекта
 3. Для автоматической настройки vagrant-коробки необходимо выполнить команду `make`, которая создаст `Vagrantfile` и `Homestead.yaml`
> Mac / Linux:
> `php vendor/bin/homestead make`
> Windows:
> `vendor\\bin\\homestead make`

 4. Отредактируйте файл `hosts` добавив в него запись для `homestead.app`, напр.:  `192.168.10.10 homestead.app`, где `192.168.10.10` - ip-адрес указанный в файле `Homestead.yaml`
 5. Запуск vagrant-коробки Laravel Homestead осуществите командой `vagrant up` набрав в консоль в директории проекта.
 6. После запуска и настройки окружения подключитесь через ssh набрав в консоли `vagrant ssh` (для Windows использовать cygwin или [git-bash](https://git-scm.com/)) и перейти в директорию проекта
 > `ls`
 > `cd название_директории _проекта`

 7. Теперь необходимо установить пакеты Laravel через **composer**, набрав в консоли `composer install`
 7. Так же необходимо установить npm-пакеты выполнив в консоли `npm install`
 8. После установки пакетов Laravel, выполните в консоли, в директории проекта `chmod -R 777 storage/`, `composer dump-autoload`, `php artisan cache:clear`
 9. Теперь необходимо запустить миграцию, выполнив в консоли `php artisan migrate`, чтобы создать таблицы и создать пользователей, выполнив команду `php artisan db:seed`
 10. Запустить Node.js сервер для трансляции событий через веб-сокет. Выполните в консоли `node ws.server/server.js`
 11. Ну и для трансляций событий из Laravel необходимо запустить слушатель очереди выполнив в консоли (в новой вкладке/окне) команду `php artisan queue:work redis --daemon`
