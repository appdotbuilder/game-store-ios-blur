<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gamestore.com',
        ]);

        // Seed game store data
        $this->call([
            GameStoreSeeder::class,
        ]);
    }
}
