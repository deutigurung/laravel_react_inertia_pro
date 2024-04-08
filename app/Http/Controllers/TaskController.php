<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        //search 
        if(request("name")) {
            $query->where("name","LIKE","%".request("name")."%");
        }

        if(request("status")) {
            $query->where("status",request("status"));
        }

        if(request("due_date")) {
            $query->whereDate("due_date",request("due_date"));
        }

        //sorting
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        $tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Task/Index",[
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
