<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'cover',
        'pdf_url',
        'user_id',
    ];
    
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
    
    public function getCoverUrlAttribute()
    {
        if (!$this->cover) {
            return null;
        }
        
        return asset('storage/'.$this->cover);
    }
    
    protected $appends = ['cover_url'];
}