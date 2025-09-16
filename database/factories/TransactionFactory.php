<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Game;
use App\Models\Voucher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['game_topup', 'voucher']);
        $transactionable = $type === 'game_topup' ? Game::factory()->create() : Voucher::factory()->create();
        
        return [
            'transaction_id' => 'TXN-' . strtoupper(fake()->bothify('??########')),
            'user_id' => User::factory(),
            'type' => $type,
            'transactionable_type' => get_class($transactionable),
            'transactionable_id' => $transactionable->id,
            'item_name' => $transactionable->name,
            'amount' => fake()->randomFloat(2, 10000, 500000),
            'status' => fake()->randomElement(['pending', 'success', 'failed', 'cancelled']),
            'payment_method' => fake()->randomElement(['bank_transfer', 'qris', 'ewallet']),
            'payment_gateway_id' => fake()->uuid(),
            'payment_details' => [
                'bank' => fake()->randomElement(['BCA', 'BNI', 'Mandiri', 'BRI']),
                'account_number' => fake()->numerify('##########'),
            ],
            'game_details' => $type === 'game_topup' ? [
                'user_id' => fake()->numerify('########'),
                'server' => fake()->randomElement(['Global', 'Asia', 'Server 1']),
                'package' => fake()->randomElement(['86 Diamonds', '172 Diamonds', '1000 UC']),
            ] : null,
            'paid_at' => fake()->boolean(70) ? fake()->dateTimeBetween('-1 month', 'now') : null,
        ];
    }

    /**
     * Indicate that the transaction is successful.
     */
    public function success(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'success',
            'paid_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the transaction is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'paid_at' => null,
        ]);
    }

    /**
     * Indicate that the transaction failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'failed',
            'paid_at' => null,
        ]);
    }
}