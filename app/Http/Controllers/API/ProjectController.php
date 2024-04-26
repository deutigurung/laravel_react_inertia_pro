<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends BaseController
{
    /**
        * @OA\Get(
        *     path="/api/projects",
        *     summary="Get a list of projects",
        *     tags={"Projects"},
        *     security={{"sanctum":{}}},
        *      @OA\Parameter(
        *         name="name",
        *         in="query",
        *         description="Project name",
        *         @OA\Schema(type="string"),
        *      ),
        *      @OA\Parameter(
        *         name="status",
        *         in="query",
        *         description="Project status",
        *        @OA\Schema(type="string"),
        *      ),
        *      @OA\Parameter(
        *         name="due_date",
        *         in="query",
        *         description="Project deadline date",
        *         @OA\Schema(type="date"),
        *      ),
        *     @OA\Response(response=200, description="Get lists of projects"),
        *     @OA\Response(response=400, description="Invalid request")
        * )
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
        return response()->json([
            'projects' => $projects,
            'queryParams' => request()->query() ?: null,
        ]);

    }

    /**
        * @OA\POST(
        *     path="/api/projects/store",
        *     summary="Store projects",
        *     security={{"sanctum":{}}},
        *      @OA\Parameter(
        *         name="name",
        *         in="query",
        *         required=true,
        *         description="Project Name",
        *        @OA\Schema(type="string"),
        *      ),
        *      @OA\Parameter(
        *         name="description",
        *         in="query",
        *         required=false,
        *         description="Project Description",
        *         @OA\Schema(type="string"),
        *      ),
        *      @OA\Parameter(
        *         name="status",
        *         in="query",
        *         required=true,
        *         example="active or inactive", 
        *         description="Project status",
        *        @OA\Schema(type="string"),
        *      ),
        *      @OA\Parameter(
        *         name="due_date",
        *         in="query",
        *         required=true,
        *         example="YYYY-MM-DD", 
        *         description="Project deadline date",
        *         @OA\Schema(type="string",format="date"),
        *      ),
        *     tags={"Projects"},
        *     @OA\Response(response=200, description="Project Created Successful"),
        *     @OA\Response(response=400, description="Invalid request"),
        *     @OA\Response(response=401, description="Unauthorized request"),
        *     @OA\Response(response=403, description="Forbidden request"),
        *     @OA\Response(response=404, description="Not Found")
        * )
    */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] =  1;
        $data['updated_by'] =  1;
        if($request->hasFile('image')){
            $image_tmp = $request->file('image');
            if($image_tmp->isValid()){
                $extension = $image_tmp->getClientOriginalExtension();
                $imageName = Str::random(20).'.'.$extension;
                Storage::putFileAs('projects',$image_tmp,$imageName);
                $data['image'] = $imageName;
            }
        }
        $project = Project::create($data);
        return response()->json([
            'project' =>  'test',
            'status' => 200
        ]);
    }

    /**
        * @OA\GET(
        *     path="/api/projects/{projectId}",
        *     summary="View single project",
        *     operationId="viewProjectId",
        *     security={{"sanctum":{}}},
        *      @OA\Parameter(
        *         name="projectId",
        *         in="path",
        *         required=true,
        *         example=1,
        *         description="Project View Id",
        *         @OA\Schema(type="integer")
        *      ),
        *     tags={"Projects"},
        *     @OA\Response(response=200, description="Show single project"),
        *     @OA\Response(response=400, description="Invalid request"),
        *     @OA\Response(response=401, description="Unauthorized request"),
        *     @OA\Response(response=403, description="Forbidden request"),
        *     @OA\Response(response=404, description="Not Found")
        * )
    */
    public function show(Project $project)
    {
        if(is_null($project)){
            return response()->json(['error' => 'Project not found'], 404);
        }
        $query = $project->tasks();
        $tasks = $query->get();
        return response()->json([
            'project' =>  new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'status' => 200
        ]);
    }

    /**
        * @OA\PUT(
        *     path="/api/projects/{projectId}",
        *     summary="Update single project",
        *     operationId="updateProjectId",
        *     security={{"sanctum":{}}},
        *      @OA\Parameter(
        *         name="projectId",
        *         in="path",
        *         required=true,
        *         description="Project Update Id",
        *         @OA\Schema(type="integer")
        *      ),
        *      @OA\Parameter(
        *         name="name",
        *         in="query",
        *         required=true,
        *         description="Project Name",
        *        @OA\Schema(type="string"),
        *      ),
        *      @OA\Parameter(
        *         name="description",
        *         in="query",
        *         required=false,
        *         description="Project Description",
        *         @OA\Schema(type="string"),
        *      ),
        *      @OA\Parameter(
        *         name="status",
        *         in="query",
         *        required=true,
        *         description="Project status",
        *        @OA\Schema(type="string"),
        *      ),
        *      @OA\Parameter(
        *         name="due_date",
        *         in="query",
        *         required=true,
        *         description="Project deadline date",
        *         @OA\Schema(type="date"),
        *      ),
        *     tags={"Projects"},
        *     @OA\Response(response=200, description="Project Updated Successful"),
        *     @OA\Response(response=400, description="Invalid request"),
        *     @OA\Response(response=401, description="Unauthorized request"),
        *     @OA\Response(response=403, description="Forbidden request"),
        *     @OA\Response(response=404, description="Not Found")
        * )
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
        }else{
            $data['image'] = $project->image;
        }
        $project->update($data);
        return response()->json([
            'project' =>  new ProjectResource($project),
            'status' => 200
        ]);
    }

      /**
      
        * @OA\DELETE(
        *     path="/api/projects/{projectId}",
        *     summary="Remove single projects",
        *     operationId="deleteProjectId",
        *     security={{"sanctum":{}}},
        *      @OA\Parameter(
        *         name="projectId",
        *         in="query",
        *         required=true,
        *         description="Project Remove Id",
        *         @OA\Schema(type="integer")
        *      ),
        *     tags={"Projects"},
        *     @OA\Response(response=200, description="Project Remove Successful"),
        *     @OA\Response(response=400, description="Invalid request"),
        *     @OA\Response(response=401, description="Unauthorized request"),
        *     @OA\Response(response=403, description="Forbidden request"),
        *     @OA\Response(response=404, description="Not Found")
        * )
    */
    public function destroy(Project $project)
    {
        if($project->tasks()->exists()){
            return response()->json([
                'status' => 400
            ]);
        }
        //remove image
        if($project->image != null){
            Storage::delete('projects/'.$project->image);
        }
        $project->delete();
        return response()->json([
            'project' =>  null,
            'status' => 200
        ]);
    }
}
