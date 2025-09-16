<?php

namespace Database\Factories;

use App\Models\GameCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Mobile Legends',
            'Free Fire',
            'Genshin Impact',
            'PUBG Mobile',
            'Arena of Valor',
            'Call of Duty Mobile',
            'Clash Royale',
            'Valorant',
            'League of Legends',
            'Honkai Impact 3rd',
        ]);
        
        return [
            'category_id' => GameCategory::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(),
            'image' => fake()->imageUrl(400, 300, 'games'),
            'publisher' => fake()->company(),
            'is_popular' => fake()->boolean(30),
            'is_active' => fake()->boolean(95),
            'server_options' => fake()->randomElement([
                ['Global', 'Asia', 'Europe', 'America'],
                ['Server 1', 'Server 2', 'Server 3'],
                null,
            ]),
        ];
    }

    /**
     * Indicate that the game is popular.
     */
    public function popular(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_popular' => true,
        ]);
    }

    /**
     * Indicate that the game is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}