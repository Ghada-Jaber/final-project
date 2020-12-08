<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PharmacyController extends Controller
{
    public function getMedicine(){
        return response()->json([
            'access' => 'here'],200);
    }
}
