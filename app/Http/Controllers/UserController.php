<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        //search 
        if(request("name")) {
            $query->where("name","LIKE","%".request("name")."%");
        }

        if(request("email")) {
            $query->where("email","LIKE","%".request("email")."%");
        }

        //sorting
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        $users = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("User/Index",[
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success'  => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = Hash::make($request->get('password'));
        User::create($data);
        return to_route("users.index")->with('success','User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return inertia("User/Show",[
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia("User/Edit",[
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if($password){
            $data['password'] = Hash::make($password);
        }else{
            unset($data['password']);
        }
        $user->update($data);
        return to_route("users.index")->with('success','User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route("users.index")->with('success','User removed successfully');
    }
}
