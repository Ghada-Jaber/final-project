<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicine;
use App\Models\User;

class UserController extends Controller
{

    public function getAllMedicineAvailable(){
        // $detail = Medicine::get();

    
        // $i=0;
        // foreach($detail as $detailMedicine){
        //     $detail->detail = $detailMedicine->detail;

        //     $detail->pharmacy = $detailMedicine->pharmacy;

        //     $i++;
        // }


        $user = User::get();


        $test = [];

    
        $i=0;
        foreach($user as $detailMedicine){
           $role = $detailMedicine->getRoles();

           if($role[0] == 'ROLE_PHARMACY'){
            $test[$i] = $detailMedicine;
            $test[$i]->medicine = $detailMedicine->medicine;
           }

            $i++;
        }
        

        return response()->json($test, 201);
    }
    
}
