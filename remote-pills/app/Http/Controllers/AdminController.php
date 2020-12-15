<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class AdminController extends Controller
{
    public function getUsers(){

        $user = User::latest()->get();

        return response()->json($user, 201);
    }
}
