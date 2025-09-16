<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GamePackage>
 */
class GamePackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $packages = [
            ['amount' => 86, 'unit' => 'Diamonds', 'price' => 15000],
            ['amount' => 172, 'unit' => 'Diamonds', 'price' => 25000],
            ['amount' => 257, 'unit' => 'Diamonds', 'price' => 35000],
            ['amount' => 344, 'unit' => 'Diamonds', 'price' => 45000],
            ['amount' => 429, 'unit' => 'Diamonds', 'price' => 55000],
            ['amount' => 878, 'unit' => 'Diamonds', 'price' => 100000],
            ['amount' => 1000, 'unit' => 'UC', 'price' => 120000],
            ['amount' => 2000, 'unit' => 'UC', 'price' => 240000],
        ];
        
        $package = fake()->randomElement($packages);
        
        return [
            'game_id' => Game::factory(),
            'name' => $package['amount'] . ' ' . $package['unit'],
            'amount' => $package['amount'],
            'unit' => $package['unit'],
            'price' => $package['price'],
            'is_active' => fake()->boolean(95),
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }

    /**
     * Indicate that the package is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}