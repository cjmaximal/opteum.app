Opteum Test Work
===============

**Стек технологий:**

 1. Бэкенд - API (Laravel 5.3)
 2. Бэкенд - WS (Node.js)
 3. Фронтенд - Laravel 5.3 и Vue.js 2.0

----------

Установка
---------

 1. Установить [Vagrant](https://www.vagrantup.com/docs/installation/) и [VirtualBox](https://www.virtualbox.org/)
 2. Установить PHP (5.6 или выше) и [Composer](https://getcomposer.org/doc/00-intro.md)
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
 8. После установки пакетов Laravel, выполните в консоли, в директории проекта `chmod -R 777 storage/`, `composer dump-autoload`, `php artisan cache:clear`
 9. Теперь необходимо запустить миграцию, выполнив в консоли `php artisan migrate` и добавить в таблицы пользователей, выполнив команду `php artisan db:seed`
 10. Запустить Node.js сервер для трансляции событий через веб-сокет выполните в консоли `node ws.server/server.js`

