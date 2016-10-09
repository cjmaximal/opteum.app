<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'slug', 'name',
    ];

    /**
     * Пользователи, которые принадлежат данной роли.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
