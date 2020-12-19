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


    public function getAllMedicineAvailable($id){


        $medicine = Medicine::get();

       $near = [];

        foreach($medicine as $detail){
           $detail->detail;

            foreach($detail->detail as $pharmacy){
                if($pharmacy->pharmacy->street_id == $id){
                    // $medicine->detail = $detail->detail;
                    $array = $pharmacy->medicine->toArray();
                    $array2 = $pharmacy->medicine->pharmacy->toArray();
                    

                    // foreach($pharmacy->medicine->pharmacy as $price){
                    //     $ok= false;
                    //     foreach($price->detail as $single){
                    //         if($price->id == $single->pharmacy_id){
                    //             if()
                    //             $ok= true;
                    //         }
                    //     }
                    //     if($ok==true){
                    //         $array3 = $price->detail->toArray();
                    //         array_push($array2, $array3);
                    //     }
                       
                    // }

                    foreach($pharmacy->medicine->detail as $price){
                        $array3 = $price->price;
                        foreach($pharmacy->medicine->pharmacy as $pri){
                        }
                       
                      array_push($array2, $array3);
                    }

                    // 

                    // 
                        array_push($array, $array2);

                    
                }
                
            }
            array_push($near, $array) ;
            
        }

        return response()->json($near, 201);

    }
    
}
