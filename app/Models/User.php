<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'phone',
        'city',
        'state',
        'bio',
        'company_name',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relationships

    // Services owned by this company
    public function servicesOwned()
    {
        return $this->hasMany(Service::class, 'owner_id');
    }

    // Services assigned to this montador
    public function servicesAssigned()
    {
        return $this->hasMany(Service::class, 'montador_id');
    }

    // Montadores linked to this company
    public function linkedMontadores()
    {
        return $this->belongsToMany(User::class, 'company_montador_links', 'company_id', 'montador_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    // Companies linked to this montador
    public function linkedCompanies()
    {
        return $this->belongsToMany(User::class, 'company_montador_links', 'montador_id', 'company_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }
}
