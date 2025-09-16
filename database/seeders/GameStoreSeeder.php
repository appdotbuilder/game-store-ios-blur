<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GameCategory;
use App\Models\Game;
use App\Models\GamePackage;
use App\Models\Voucher;
use Illuminate\Support\Str;

class GameStoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create game categories
        $categories = [
            ['name' => 'Top Up Game', 'icon' => '🎮', 'description' => 'Top up your favorite games'],
            ['name' => 'Voucher', 'icon' => '🎫', 'description' => 'Digital vouchers for various platforms'],
            ['name' => 'Promo', 'icon' => '🔥', 'description' => 'Special promotional offers'],
        ];

        foreach ($categories as $category) {
            GameCategory::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'icon' => $category['icon'],
                'description' => $category['description'],
                'is_active' => true,
            ]);
        }

        $topUpCategory = GameCategory::where('slug', 'top-up-game')->first();

        // Create popular games
        $games = [
            [
                'name' => 'Mobile Legends',
                'publisher' => 'Moonton',
                'description' => 'Top up Mobile Legends diamonds instantly',
                'server_options' => ['Global', 'Southeast Asia', 'Western', 'Eastern'],
                'is_popular' => true,
            ],
            [
                'name' => 'Free Fire',
                'publisher' => 'Garena',
                'description' => 'Top up Free Fire diamonds quickly and safely',
                'server_options' => ['Global', 'Brazil', 'India', 'Indonesia'],
                'is_popular' => true,
            ],
            [
                'name' => 'Genshin Impact',
                'publisher' => 'HoYoverse',
                'description' => 'Top up Genesis Crystals for Genshin Impact',
                'server_options' => ['Asia', 'America', 'Europe', 'TW/HK/MO'],
                'is_popular' => true,
            ],
            [
                'name' => 'PUBG Mobile',
                'publisher' => 'Tencent Games',
                'description' => 'Top up PUBG Mobile UC instantly',
                'server_options' => ['Global', 'Korea', 'Vietnam', 'Chinese'],
                'is_popular' => true,
            ],
            [
                'name' => 'Call of Duty Mobile',
                'publisher' => 'Activision',
                'description' => 'Top up COD Mobile CP points',
                'server_options' => ['Global', 'Garena'],
                'is_popular' => false,
            ],
        ];

        foreach ($games as $gameData) {
            $game = Game::create([
                'category_id' => $topUpCategory->id,
                'name' => $gameData['name'],
                'slug' => Str::slug($gameData['name']),
                'description' => $gameData['description'],
                'publisher' => $gameData['publisher'],
                'server_options' => $gameData['server_options'],
                'is_popular' => $gameData['is_popular'],
                'is_active' => true,
            ]);

            // Create packages for each game
            $packages = $this->getPackagesForGame($gameData['name']);
            foreach ($packages as $index => $package) {
                GamePackage::create([
                    'game_id' => $game->id,
                    'name' => $package['name'],
                    'amount' => $package['amount'],
                    'unit' => $package['unit'],
                    'price' => $package['price'],
                    'is_active' => true,
                    'sort_order' => $index + 1,
                ]);
            }
        }

        // Create vouchers
        $vouchers = [
            ['name' => 'Steam Wallet IDR 10,000', 'platform' => 'Steam', 'price' => 12000],
            ['name' => 'Steam Wallet IDR 20,000', 'platform' => 'Steam', 'price' => 22000],
            ['name' => 'Steam Wallet IDR 50,000', 'platform' => 'Steam', 'price' => 52000],
            ['name' => 'Steam Wallet IDR 100,000', 'platform' => 'Steam', 'price' => 102000],
            ['name' => 'Google Play IDR 10,000', 'platform' => 'Google Play', 'price' => 11000],
            ['name' => 'Google Play IDR 25,000', 'platform' => 'Google Play', 'price' => 26000],
            ['name' => 'Google Play IDR 50,000', 'platform' => 'Google Play', 'price' => 51000],
            ['name' => 'PSN Wallet IDR 50,000', 'platform' => 'PlayStation', 'price' => 55000],
            ['name' => 'PSN Wallet IDR 100,000', 'platform' => 'PlayStation', 'price' => 105000],
            ['name' => 'iTunes IDR 25,000', 'platform' => 'iTunes', 'price' => 27000],
            ['name' => 'iTunes IDR 50,000', 'platform' => 'iTunes', 'price' => 52000],
            ['name' => 'iTunes IDR 100,000', 'platform' => 'iTunes', 'price' => 102000],
        ];

        foreach ($vouchers as $voucher) {
            Voucher::create([
                'name' => $voucher['name'],
                'slug' => Str::slug($voucher['name']),
                'description' => "Digital voucher for {$voucher['platform']}",
                'price' => $voucher['price'],
                'platform' => $voucher['platform'],
                'is_active' => true,
                'stock' => random_int(100, 500),
            ]);
        }
    }

    /**
     * Get packages for specific games
     */
    protected function getPackagesForGame(string $gameName): array
    {
        switch ($gameName) {
            case 'Mobile Legends':
                return [
                    ['name' => '86 Diamonds', 'amount' => 86, 'unit' => 'Diamonds', 'price' => 15000],
                    ['name' => '172 Diamonds', 'amount' => 172, 'unit' => 'Diamonds', 'price' => 25000],
                    ['name' => '257 Diamonds', 'amount' => 257, 'unit' => 'Diamonds', 'price' => 35000],
                    ['name' => '344 Diamonds', 'amount' => 344, 'unit' => 'Diamonds', 'price' => 45000],
                    ['name' => '429 Diamonds', 'amount' => 429, 'unit' => 'Diamonds', 'price' => 55000],
                    ['name' => '878 Diamonds', 'amount' => 878, 'unit' => 'Diamonds', 'price' => 100000],
                ];
            
            case 'Free Fire':
                return [
                    ['name' => '70 Diamonds', 'amount' => 70, 'unit' => 'Diamonds', 'price' => 10000],
                    ['name' => '140 Diamonds', 'amount' => 140, 'unit' => 'Diamonds', 'price' => 20000],
                    ['name' => '355 Diamonds', 'amount' => 355, 'unit' => 'Diamonds', 'price' => 50000],
                    ['name' => '720 Diamonds', 'amount' => 720, 'unit' => 'Diamonds', 'price' => 100000],
                    ['name' => '1450 Diamonds', 'amount' => 1450, 'unit' => 'Diamonds', 'price' => 200000],
                ];

            case 'Genshin Impact':
                return [
                    ['name' => '60 Genesis Crystals', 'amount' => 60, 'unit' => 'Genesis Crystals', 'price' => 15000],
                    ['name' => '300 Genesis Crystals', 'amount' => 300, 'unit' => 'Genesis Crystals', 'price' => 75000],
                    ['name' => '980 Genesis Crystals', 'amount' => 980, 'unit' => 'Genesis Crystals', 'price' => 245000],
                    ['name' => '1980 Genesis Crystals', 'amount' => 1980, 'unit' => 'Genesis Crystals', 'price' => 499000],
                ];

            case 'PUBG Mobile':
                return [
                    ['name' => '60 UC', 'amount' => 60, 'unit' => 'UC', 'price' => 10000],
                    ['name' => '325 UC', 'amount' => 325, 'unit' => 'UC', 'price' => 50000],
                    ['name' => '660 UC', 'amount' => 660, 'unit' => 'UC', 'price' => 100000],
                    ['name' => '1800 UC', 'amount' => 1800, 'unit' => 'UC', 'price' => 250000],
                    ['name' => '3850 UC', 'amount' => 3850, 'unit' => 'UC', 'price' => 500000],
                ];

            default:
                return [
                    ['name' => '100 Credits', 'amount' => 100, 'unit' => 'Credits', 'price' => 15000],
                    ['name' => '500 Credits', 'amount' => 500, 'unit' => 'Credits', 'price' => 75000],
                    ['name' => '1000 Credits', 'amount' => 1000, 'unit' => 'Credits', 'price' => 150000],
                ];
        }
    }
}