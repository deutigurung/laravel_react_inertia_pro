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
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="Name of the project",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Status of the project",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="due_date",
     *         in="query",
     *         description="Due date of the project",
     *         @OA\Schema(type="string", format="date")
     *     ),
     *      @OA\Response(response=200, description="successful operation",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(property="data", ref="#components/schemas/ProjectResource")
     *              )
     *          )
     *      ),
     *     @OA\Response(response=400, description="Invalid request", @OA\JsonContent()),
     * )
     */

    public function index()
    {
        $query = Project::query();
        //search 
        // if(request("name")) {
        //     $query->where("name","LIKE","%".request("name")."%");
        // }

        // if(request("status")) {
        //     $query->where("status",request("status"));
        // }

        // if(request("due_date")) {
        //     $query->whereDate("due_date",request("due_date"));
        // }

        //sorting
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");
        $projects = $query->get();
        $projects = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return response()->json([
            'projects' => $projects,
            'queryParams' => request()->query() ?: null,
        ]);

    }

    /**
        * @OA\POST(
        *     path="/api/projects",
        *     summary="Store projects",
        *     security={{"sanctum":{}}},
        *      @OA\RequestBody(
        *          @OA\MediaType(mediaType="application/json",
        *               @OA\Schema(ref="#/components/schemas/StoreProjectRequest")   
        *         )
        *      ),
        *     tags={"Projects"},
        *      @OA\Response(response=200, description="successful operation",
        *          @OA\MediaType(
        *              mediaType="application/json",
        *              @OA\Schema(
        *                  @OA\Property(property="data", ref="#components/schemas/ProjectResource")
        *              )
        *          )
        *      ),
        *     @OA\Response(response=400, description="Invalid request"),
        *     @OA\Response(response=401, description="Unauthorized request"),
        *     @OA\Response(response=403, description="Forbidden request"),
        *     @OA\Response(response=404, description="Not Found")
        * )
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
        $project = Project::create($data);
        return response()->json([
            'project' =>  $project,
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
        *     @OA\Response(response=200, description="Project view Successful"),
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
        * @OA\PATCH(
        *     path="/api/projects/{projectId}",
        *     summary="Update projects",
        *     operationId="updateProjectId",
        *     security={{"sanctum":{}}},
        *      @OA\Parameter(
        *         name="projectId",
        *         in="path",
        *         required=true,
        *         description="Project Update Id",
        *         @OA\Schema(type="integer")
        *      ),
        *      @OA\RequestBody(
        *          @OA\MediaType(mediaType="application/json",
        *               @OA\Schema(ref="#/components/schemas/UpdateProjectRequest")   
        *         )
        *      ),
        *     tags={"Projects"},
        *     @OA\Response(response=200, description="Project updated Successful"),
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
        *         in="path",
        *         required=true,
        *         description="Project Remove Id",
        *         @OA\Schema(type="integer")
        *      ),
        *     tags={"Projects"},
        *     @OA\Response(response=200, description="Project deleted Successful"),
        *     @OA\Response(response=400, description="Invalid request"),
        *     @OA\Response(response=401, description="Unauthorized request"),
        *     @OA\Response(response=403, description="Forbidden request"),
        *     @OA\Response(response=404, description="Not Found")
        * )
    */
    public function destroy(Project $project)
    {
        //remove image
        if($project->image != null){
            Storage::delete('projects/'.$project->image);
        }
        $project->tasks()->delete();
        $project->delete();
        return response()->json([
            'status' => 200
        ]);
    }
}
