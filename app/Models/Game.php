<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * App\Models\Game
 *
 * @property int $id
 * @property int $category_id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string|null $image
 * @property string|null $publisher
 * @property bool $is_popular
 * @property bool $is_active
 * @property array|null $server_options
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\GameCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GamePackage> $packages
 * @property-read int|null $packages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Transaction> $transactions
 * @property-read int|null $transactions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Game newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Game newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Game query()
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereIsPopular($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game wherePublisher($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereServerOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game active()
 * @method static \Illuminate\Database\Eloquent\Builder|Game popular()
 * @method static \Database\Factories\GameFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Game extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'image',
        'publisher',
        'is_popular',
        'is_active',
        'server_options',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_popular' => 'boolean',
        'is_active' => 'boolean',
        'server_options' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the category that owns the game.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(GameCategory::class);
    }

    /**
     * Get the packages for the game.
     */
    public function packages(): HasMany
    {
        return $this->hasMany(GamePackage::class)->orderBy('sort_order');
    }

    /**
     * Get all of the game's transactions.
     */
    public function transactions(): MorphMany
    {
        return $this->morphMany(Transaction::class, 'transactionable');
    }

    /**
     * Scope a query to only include active games.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include popular games.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }
}