<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\City;

class CountryController extends Controller
{
    public function getAllCountry(){
        $country = Country::latest()->get();

        return response()->json($country, 201);
    }


    public function getAllCity(Country $country){
        $city = $country->city;

        return response()->json($city, 201);
    }


    public function getAllStreet(City $city){
        $street = $city->street;

        return response()->json($street, 201);
    }
}
