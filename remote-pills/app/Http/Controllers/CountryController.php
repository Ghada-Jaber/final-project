<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;

class CountryController extends Controller
{
    public function getAllCountry()
    {
        $country = Country::latest()->get();

        return response()->json($country, 201);
    }
}
