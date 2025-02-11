<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubTask extends Model
{
    use HasFactory;

    protected $fillable = ['task_id', 'title', 'completed','datetime'];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
