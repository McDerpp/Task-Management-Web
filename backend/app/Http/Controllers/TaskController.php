<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::with('subTasks')->get(); // Include subtasks
    }

    public function store(Request $request)
    {
        $validated = $request->merge([
            'title' => $request->input('title', 'Untitled Task'), // Default title
            'color' => $request->input('color', 'white'), // Default color
        ])->validate([
            'title' => 'required|string',
            'color' => 'nullable|string',
        ]);
    
        return Task::create($validated);
    }
    

    public function show(Task $task)
    {
        return $task->load('subTasks');
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'color' => 'nullable|string',
        ]);

        $task->update($validated);
        return $task;
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->noContent();
    }
}
