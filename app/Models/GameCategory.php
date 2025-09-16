<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\GameCategory
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $icon
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Game> $games
 * @property-read int|null $games_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameCategory active()
 * @method static \Database\Factories\GameCategoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GameCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the games for the category.
     */
    public function games(): HasMany
    {
        return $this->hasMany(Game::class, 'category_id');
    }

    /**
     * Scope a query to only include active categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}