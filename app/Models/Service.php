<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'montador_id',
        'title',
        'description',
        'address',
        'scheduled_at',
        'price',
        'status',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function montador()
    {
        return $this->belongsTo(User::class, 'montador_id');
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
