<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicine;
use App\Models\User;

class UserController extends Controller
{

    public function getAllMedicinePharmacy(){
        // $detail = Medicine::get();

    
        // $i=0;
        // foreach($detail as $detailMedicine){
        //     $detail->detail = $detailMedicine->detail;

        //     $detail->pharmacy = $detailMedicine->pharmacy;

        //     $i++;
        // }


        $user = User::get();


        $pharmacy = [];

    
        $i=0;
        foreach($user as $detailMedicine){
           $role = $detailMedicine->getRoles();

           if($role[0] == 'ROLE_PHARMACY'){
            // $pharmacy[$i] = $detailMedicine;
           

            foreach($detailMedicine->medicine as $medicine){
               $array= $detailMedicine->medicine->toArray();
               foreach($medicine->detail as $price){
                $array2 = $medicine->detail->toArray();
                array_push($array, $array2) ;
               }
                

                array_push($array, $medicine) ;
              
            }
            // $detail = $detailMedicine->detail;
            // $array = $detail->toArray();
            // array_push($array, $detailMedicine->medicine) ;
            // $pharmacy[$i]->medicine = $detailMedicine->medicine;

            array_push($pharmacy, $detailMedicine) ;
           }

            $i++;
        }
        

        return response()->json($pharmacy, 201);
    }


    public function getAllMedicineAvailable(){


        $medicine = Medicine::get();

       

        foreach($medicine as $detail){

            $medicine->detail = $detail->detail;

            $array= $medicine->detail->toArray();

            foreach($medicine->detail as $pharmacy){
                array_push($array, $pharmacy->pharmacy) ;
            }
        }

        return response()->json($medicine, 201);

    }
    
}
