<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Medicine;

class AdminController extends Controller
{
    public function getUsers(){

        $user = User::latest()->get();

        return response()->json($user, 201);
    }


    public function getMedicinePharmacy(Medicine $medicine){

        $pharmacy = $medicine->pharmacy;

        return response()->json($pharmacy, 201);
    }

    public function addMedicine(Request $request){

        

        $request->validate([
            'name' => 'required|string|max:255',
            // 'image' => 'image|mimes:jpeg,png,jpg,gif,svg', //|exists:users
            'format' => 'required',
            'description' => 'required|string',
            'ingredient' => 'required|string',
            'prescription' => 'boolean',
            'tablet' => 'required|integer',
            'dosage' => 'required|numeric',
            'dosage_unit' => 'required|string',
        ]);

        //return response()->json(['al' =>'dd'], 201);
        if($request->hasFile('image')){
        $image = $request['image']->store('uploads/medicine');

    }else{
        $image = "uploads/medicine/NoImage.png";
    }
        

        $medicine = Medicine::create([
            'name' => $request['name'],
            'image' => $image,
            'format' => $request['format'],
            'description' => $request['description'],
            'ingredient' => $request['ingredient'],
            'prescription' => $request['prescription'],
            'tablet' => $request['tablet'],
            'dosage' => $request['dosage'],
            'dosage_unit' => $request['dosage_unit'],
          ]);

        

        return response()->json($medicine, 201);
    }

    public function getInfoMedicine(Medicine $medicine){
        return response()->json($medicine, 201);
    }


    public function updateInfoMedicine(Request $request, Medicine $medicine){

        

        $request->validate([
            'name' => 'required|string|max:255',
            // 'image' => 'image|mimes:jpeg,png,jpg,gif,svg', //|exists:users
            'format' => 'required',
            'description' => 'required|string',
            'ingredient' => 'required|string',
            'prescription' => 'boolean',
            'tablet' => 'required|integer',
            'dosage' => 'required|numeric',
            'dosage_unit' => 'required|string',
        ]);
        

        $medicine->update([
            'name' => $request['name'],
            'format' => $request['format'],
            'description' => $request['description'],
            'ingredient' => $request['ingredient'],
            'prescription' => $request['prescription'],
            'tablet' => $request['tablet'],
            'dosage' => $request['dosage'],
            'dosage_unit' => $request['dosage_unit'],
          ]);

        

        return response()->json($medicine, 201);
    }


    public function destroy(Medicine $medicine)
    {
        $medicine->delete();
        return response()->json($medicine, 201);
    }
}
