<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\SubTaskController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', TaskController::class);
Route::apiResource('subtasks', SubTaskController::class);
Route::get('subtasks/task/{taskId}', [SubTaskController::class, 'showByTaskId']);
Route::patch('/subtasks/{subTask}', [SubTaskController::class, 'update']);
