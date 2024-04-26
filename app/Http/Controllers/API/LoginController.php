<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
        * @OA\POST(
        *     path="/api/login/store",
        *     summary="Authenticate User Login and generate token",
        *      @OA\Parameter(
        *         name="email",
        *         in="query",
        *         required=true,
        *         description="Email Name",
        *         @OA\Schema(type="string")
        *      ),
        *      @OA\Parameter(
        *         name="password",
        *         in="query",
        *         required=true,
        *         description="Password",
        *         @OA\Schema(type="string")
        *      ),
        *     tags={"Login"},
        *     @OA\Response(response=200, description="Login Successful"),
        *     @OA\Response(response=400, description="Invalid request")
        * )
    */
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $token = $user->createToken('user_name');
            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        }
    }
}
