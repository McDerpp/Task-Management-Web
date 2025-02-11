<?php

namespace App\Http\Controllers;

use App\Models\SubTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


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
            'datetime' => 'nullable|date', // Allow optional datetime
        ]);

        return SubTask::create($validated);
    }


    public function show(SubTask $subTask)
    {
        return $subTask->load('task');
    }

    public function update(Request $request, $id)
    {
        $subTask = SubTask::findOrFail($id);

        try {
            $validated = $request->validate([
                'title' => 'sometimes|required|string',
                'completed' => 'nullable|boolean',
                'datetime' => 'nullable|date',
            ]);

            $subTask->update($validated);
            return response()->json($subTask, 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation Error: ' . json_encode($e->errors()));
            return response()->json($e->errors(), 422);
        }
    }

    public function destroy($id)
    {
        $subTask = SubTask::findOrFail($id);
        $subTask->delete();

        return response()->noContent();
    }


    public function showByTaskId($taskId)
    {
        $subtasks = SubTask::where('task_id', $taskId)->get();
        return $subtasks->load('task');
    }
}
