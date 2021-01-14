<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Medicine;
use App\Models\MedicineSymptom;
use App\Models\Symptom;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function getUsers($type){

        $user = User::latest()->get()->flatten();

        foreach($user as $address){
            $user->street = $address->street->name;
            $user->city = $address->street->city->name;
            $user->country = $address->street->city->country->name;
        }

        $pharmacy = [];

        $i=0;
 
         foreach($user as $infoProject){
            $role = $infoProject->getRoles();

            if($role[0] == $type){
                array_push($pharmacy, $infoProject) ;
            }
           
             // $arr = $project[$i]->toArray();
             // array_push($arr, $access) ;
             $i++;
         }
       

        return response()->json($pharmacy, 201);
    }

 


    public function getMedicinePharmacy(Medicine $medicine){

        $pharmacy = $medicine->pharmacy;

        return response()->json($pharmacy, 201);
    }


    public function getPharmacyMedicine(User $pharmacy){

        $pharmacy = $pharmacy->medicine;

        return response()->json($pharmacy, 201);
    }

    

    public function addMedicine(Request $request){

        $request->validate([
            'name' => 'required|string|max:255',
            'format' => 'required',
            'description' => 'required|string',
            'ingredient' => 'required|string',
            'prescription' => 'boolean',
            'tablet' => 'required|integer',
            'dosage' => 'required|numeric',
            'dosage_unit' => 'required|string',
            'symptom' => 'required',
        ]);

        
        if($request->hasFile('image')){
        $image = $request['image']->store('public/uploads/medicine');

    }else{
        $image = "public/uploads/medicine/NoImage.png";
    }
    $url = Storage::url($image); 

        $medicine = Medicine::create([
            'name' => $request['name'],
            'image' => $url,
            'format' => $request['format'],
            'description' => $request['description'],
            'ingredient' => $request['ingredient'],
            'prescription' => $request['prescription'],
            'tablet' => $request['tablet'],
            'dosage' => $request['dosage'],
            'dosage_unit' => $request['dosage_unit'],
          ]);


          $symptom = $request['symptom'];

          $symptom =  explode(",", $symptom );
 
        

          foreach($symptom as $id){
            MedicineSymptom::create([
            'medicine_id' => $medicine->id,
            'symptom_id' => $id
          ]);
          }

        

        return response()->json($medicine, 201);
    }

    public function getInfoMedicine(Medicine $medicine){
        $medicine->symptom = $medicine->symptom->flatten();
        return response()->json($medicine, 201);
    }


    public function getInfoPharmacy(User $user){

        $user->medicine;
        $user->street->city->country;
        
        return response()->json($user, 201);
    }


    public function getInfoDoctor(User $user){

        $user->doctor;
        foreach($user->doctor as $patient){
            $patient->patient;
        }
        $user->street->city->country;
        
        return response()->json($user, 201);
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


    public function updatePharmacy(Request $request, User $user){
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        

        $user->update([
            'name' => $request['name'],
          ]);


          return response()->json($user, 201);

    }


    public function destroy(Medicine $medicine)
    {
        $medicine->delete();
        return response()->json($medicine, 201);
    }


    public function getAllSymptom(){
        $symptom = Symptom::get();

        return response()->json($symptom, 201);
    }

    public function addSymptom(Request $request){

        $request->validate([
            'symptomName' => 'required|string',
        ]);

        


        $symptom = Symptom::create([
            'name' => $request['symptomName'],
          ]);

        return response()->json($symptom, 201);

    }

    public function deleteUser(User $user, Request $request){

        $user->active = $request['active'];
        $user->save();

        return response()->json($user, 201);

    }

    public function activeUser(User $user, Request $request){

        $user->active = $request['active'];
        $user->save();

        return response()->json($user, 201);

    }

    
}
