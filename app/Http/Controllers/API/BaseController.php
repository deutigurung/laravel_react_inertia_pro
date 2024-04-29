<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

 /**
    * @OA\Info(
    *     title="Integration Swagger Api with Laravel Sanctum authentication",
    *     version="0.1",
    * ),
    * @OA\SecurityScheme(
    *     securityScheme="sanctum",
    *     type="http",
    *     scheme="bearer",
    *     bearerFormat="JWT",
    * )
   
*/
class BaseController extends Controller
{
    //
}
