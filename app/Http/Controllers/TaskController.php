<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Task/Create",[
            'projects' => ProjectResource::collection(Project::get()),
            'users' => UserResource::collection(User::get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['project_id'] = $data['project'];
        $data['assigned_user_id'] = $data['assigned_user'];
        $data['created_by'] =  auth()->id();
        $data['updated_by'] =  auth()->id();
        if($request->hasFile('image')){
            $image_tmp = $request->file('image');
            if($image_tmp->isValid()){
                $extension = $image_tmp->getClientOriginalExtension();
                $imageName = Str::random(20).'.'.$extension;
                Storage::putFileAs('tasks',$image_tmp,$imageName);
                $data['image'] = $imageName;
            }
        }
        Task::create($data);
        return to_route('tasks.index')->with('success','Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia("Task/Show",[
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia("Task/Edit",[
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection(Project::get()),
            'users' => UserResource::collection(User::get()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['project_id'] = $data['project'];
        $data['assigned_user_id'] = $data['assigned_user'];
        $data['updated_by'] =  auth()->id();
        if($request->hasFile('image')){
            $image_tmp = $request->file('image');
            //delete old image
            if($task->image != null){
                Storage::delete('tasks/'.$task->image);
            }
            if($image_tmp->isValid()){
                $extension = $image_tmp->getClientOriginalExtension();
                $imageName = Str::random(20).'.'.$extension;
                Storage::putFileAs('tasks',$image_tmp,$imageName);
                $data['image'] = $imageName;
            }
        }else{
            $data['image'] = $task->image;
        }
        $task->update($data);
        return to_route('tasks.index')->with('success','Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if($task->image != null){
            Storage::delete('tasks/'.$task->image);
        }
        $task->delete();
        return to_route('tasks.index')->with('success','Task removed successfully');
    }

    public function myTasks(){
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id',$user->id);
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
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }
}
