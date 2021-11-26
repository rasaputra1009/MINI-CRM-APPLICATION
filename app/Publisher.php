<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publisher extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'email',
        'phone',
        'address',
        'website',
        'assignedTo'
    ];
}
