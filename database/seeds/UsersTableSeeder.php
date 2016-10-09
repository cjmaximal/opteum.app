<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // очистка таблиц
        DB::table('roles')->delete();
        DB::table('users')->delete();

        // создаём роли
        $roleManager = Role::create([
            'slug' => 'manager',
            'name' => 'Диспетчер',
        ]);

        // создаём пользователей
        $manager1 = User::create([
            'name'     => 'Диспетчер 1',
            'email'    => 'manager1@opteum.ru',
            'password' => bcrypt('123456'),
        ]);

        $manager2 = User::create([
            'name'     => 'Диспетчер 2',
            'email'    => 'manager2@opteum.ru',
            'password' => bcrypt('123456'),
        ]);

        // назначаем роли
        $manager1->roles()->sync([$roleManager->getKey()]);
        $manager2->roles()->sync([$roleManager->getKey()]);
    }
}
