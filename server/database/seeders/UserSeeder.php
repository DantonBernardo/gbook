<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'type' => 'professor',
            'name' => 'teacher',
            'email' => 'professor@gmail.com',
            'password' => Hash::make('123'),
            'profile_image' => null,
        ]);
        User::create([
            'type' => 'aluno',
            'name' => 'student',
            'email' => 'aluno@gmail.com',
            'password' => Hash::make('123'),
            'profile_image' => null,
        ]);
    }
}
