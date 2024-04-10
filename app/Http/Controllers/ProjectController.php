<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
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

        $projects = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Project/Index",[
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success'  => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] =  auth()->id();
        $data['updated_by'] =  auth()->id();
        if($request->hasFile('image')){
            $image_tmp = $request->file('image');
            if($image_tmp->isValid()){
                $extension = $image_tmp->getClientOriginalExtension();
                $imageName = Str::random(20).'.'.$extension;
                Storage::putFileAs('projects',$image_tmp,$imageName);
                $data['image'] = $imageName;
            }
        }
        Project::create($data);
        return to_route("projects.index")->with('success','Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
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
        return inertia("Project/Show",[
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null
        ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia("Project/Create",[
            'project' => $project
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $data['updated_by'] =  auth()->id();
        if($request->hasFile('image')){
            $image_tmp = $request->file('image');
            //delete old image
            if($project->image != null){
                Storage::delete('projects/'.$project->image);
            }
            if($image_tmp->isValid()){
                $extension = $image_tmp->getClientOriginalExtension();
                $imageName = Str::random(20).'.'.$extension;
                Storage::putFileAs('projects',$image_tmp,$imageName);
                $data['image'] = $imageName;
            }
        }
        $project->update($data);
        return to_route("projects.index")->with('success','Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if($project->tasks()->exists()){
            return to_route("projects.index")->with('success','Unable to remove. Project has tasks.');
        }
        //remove image
        if($project->image != null){
            Storage::delete('projects/'.$project->image);
        }
        $project->delete();
        return to_route("projects.index")->with('success','Project removed successfully');
    }
}
