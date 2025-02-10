<?php

namespace App\Http\Controllers;

use App\Models\SubTask;
use Illuminate\Http\Request;

class SubTaskController extends Controller
{
    public function index()
    {
        return SubTask::with('task')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'title' => 'required|string',
            'completed' => 'nullable|boolean',
        ]);

        return SubTask::create($validated);
    }

    public function show(SubTask $subTask)
    {
        return $subTask->load('task');
    }

    public function update(Request $request, SubTask $subTask)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'completed' => 'nullable|boolean',
        ]);

        $subTask->update($validated);
        return response()->json($subTask, 200);
    }


    public function destroy(SubTask $subTask)
    {
        $subTask->delete();
        return response()->noContent();
    }

    public function showByTaskId($taskId)
    {
        $subtasks = SubTask::where('task_id', $taskId)->get();
        return $subtasks->load('task');
    }
}
