<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        $user = auth()->user();
        $totalPendingTasks = Task::where('status','pending')->count();
        $myPendingTasks = Task::where('status','pending')
                            ->where('assigned_user_id',$user->id)->count();

        $totalProgressTasks = Task::where('status','in_progress')->count();
        $myProgressTasks = Task::where('status','in_progress')
                                ->where('assigned_user_id',$user->id)->count();

        $totalCompletedTasks = Task::where('status','complete')->count();
        $myCompletedTasks = Task::where('status','complete')
                        ->where('assigned_user_id',$user->id)->count();

        $latestTasks = Task::whereIn('status',['pending','in_progress'])->where('assigned_user_id',$user->id)
                        ->latest()->limit(10)->get();
        $latestTasks = TaskResource::collection($latestTasks);
        return inertia('Dashboard',compact('totalPendingTasks','myPendingTasks','totalProgressTasks','myProgressTasks',
            'totalCompletedTasks','myCompletedTasks','latestTasks'));
    }
}
