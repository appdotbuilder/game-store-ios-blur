<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GamePackage
 *
 * @property int $id
 * @property int $game_id
 * @property string $name
 * @property int $amount
 * @property string $unit
 * @property float $price
 * @property bool $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Game $game
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage query()
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereGameId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GamePackage active()
 * @method static \Database\Factories\GamePackageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GamePackage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'game_id',
        'name',
        'amount',
        'unit',
        'price',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the game that owns the package.
     */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Scope a query to only include active packages.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}