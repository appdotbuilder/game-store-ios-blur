<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voucher>
 */
class VoucherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $vouchers = [
            ['name' => 'Steam Wallet IDR 10,000', 'platform' => 'Steam', 'price' => 12000],
            ['name' => 'Steam Wallet IDR 20,000', 'platform' => 'Steam', 'price' => 22000],
            ['name' => 'Steam Wallet IDR 50,000', 'platform' => 'Steam', 'price' => 52000],
            ['name' => 'Google Play IDR 10,000', 'platform' => 'Google Play', 'price' => 11000],
            ['name' => 'Google Play IDR 25,000', 'platform' => 'Google Play', 'price' => 26000],
            ['name' => 'PSN Wallet IDR 50,000', 'platform' => 'PlayStation', 'price' => 55000],
            ['name' => 'PSN Wallet IDR 100,000', 'platform' => 'PlayStation', 'price' => 105000],
            ['name' => 'iTunes IDR 25,000', 'platform' => 'iTunes', 'price' => 27000],
            ['name' => 'iTunes IDR 50,000', 'platform' => 'iTunes', 'price' => 52000],
        ];
        
        $voucher = fake()->randomElement($vouchers);
        
        return [
            'name' => $voucher['name'],
            'slug' => Str::slug($voucher['name']),
            'description' => fake()->sentence(),
            'image' => fake()->imageUrl(300, 200, 'vouchers'),
            'price' => $voucher['price'],
            'platform' => $voucher['platform'],
            'is_active' => fake()->boolean(95),
            'stock' => fake()->numberBetween(50, 500),
        ];
    }

    /**
     * Indicate that the voucher is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => 0,
        ]);
    }

    /**
     * Indicate that the voucher is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}