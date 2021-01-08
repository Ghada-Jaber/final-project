<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Medicine;
use App\Models\User;
use App\Models\Customer;
use App\Models\Buy;
use App\Models\Payment;
use App\Models\Cart;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function getAllUsers(){

        $user = User::all();


        return response()->json($user, 201);
    }

    public function getAllMedicinePharmacy(){


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

       foreach($medicine as $pharmacy){
           $array = $pharmacy->toArray();
           $array2 = [];
           foreach($pharmacy->pharmacy as $info){
               if($info->street_id == $id){
               
               $array3 = [];
             
               foreach($pharmacy->detail as $detail){
                   if($detail->pharmacy_id == $info->id){
                   // array_push($info->id,  $detail->price); 
                    $info->price = $detail->price;
                   }
               }

               array_push($array2,  $info->toArray()); 

            //    array_push($array2,  $array3); 
            }
           }

           array_push($array, $array2); 
           
        array_push($near, $array);
       }

            return response()->json($near, 201);

            array_push($near, $array) ;



            $query = DB::table('medicine')
            ->join('detail', 'detail.medicine_id', '=', 'medicine.id')
            ->join('users', 'detail.pharmacy_id', '=', 'users.id')
            ->select('medicine.name as medicine','medicine.image','price','users.name as pharmacy')
            ->where('users.street_id', '=', $id)
             ->get();
            
    }


    public function showMedicine(Medicine $medicine){
        $medicine->symptom = $medicine->symptom->flatten();
        foreach($medicine->detail as $detail){
            $medicine->detail = $detail->pharmacy;
        }

        return response()->json($medicine,200);
    }



    public function addCartMedicine(Request $request, Medicine $medicine){

        $user = Auth::user();



        $customer= Customer::where('pharmacy_id', '=', $request['pharmacy_id'])
        ->where('customer_id', '=', $user->id)->get()->flatten();



        if($customer->count()==0){
        $customer =  Customer::create([
            'pharmacy_id' => $request['pharmacy_id'],
            'customer_id' => $user->id
        ]);
        $id= $customer->id;

        }else{
            $id = $customer[0]->id;
        }

        $buy = Cart::create([
            'customer_id' => $id,
            'medicine_id' => $medicine->id,
            'quantity' => $request['quantity'],
            'price' => $request['price'],
            'reservation' =>$request['reservation']
        ]);

       

        return response()->json($buy, 201);

    }



    public function getCartMedicine(){

        $user = Auth::user();


        $customer = $user->customer;

       
        foreach($customer as $buy){
            $buy->pharmacy;
           $buy->cart;
           
                foreach($buy->cart as $medicine){
                    

                    $medicine->medicine; 

                }
        }


        return response()->json($customer, 201);
    }


    function deleteCartMedicine(Buy $buy){
        $buy->delete();
        return response()->json($buy, 201);
    }


    function addPayment(Request $request){
        
        if($request['type']== 'credit card'){
            $request->validate([
                'creditCardNumber' => 'required|integer',
                'nameOnCard' => 'required|string',
                'expiryDate' => 'required|string',
                'cvvCode' => 'required|integer'
            ]);
        }

        $payment =  Payment::create([
            'type' => $request['type'],
            'price' => $request['price'],
            'creditCardNumber' => $request['creditCardNumber'],
            'nameOnCard' => $request['nameOnCard'],
            'expiryDate' => $request['expiryDate'],
            'cvvCode' => $request['cvvCode']
        ]);

        

        $buy = $request['buy'];

        
        foreach($buy as $id){
            $cart = Cart::find($id);

            $addPayment = Buy::create([
                'customer_id' => $cart->customer_id,
                'medicine_id' => $cart->medicine_id,
                'quantity' => $cart->quantity,
                'price' => $cart->price,
                'payment_id' => $payment->id
            ]);

            $cart->delete();
            $addPayment->customer->pharmacy;
            $addPayment->customer->customer;

        }
        



        return response()->json($addPayment, 201);
    }


    public function askPrescription(Request $request){

        $user = Auth::user();

        $request->validate([
            'description' => 'required|string'
        ]);


        $addPayment = Patient::create([
            'patient_id' => $user->id,
            'description' => $request['name']." ".$request['description']
        ]);


        return response()->json(['add'=>'succcess add'], 201);


    }

    public function getPrescription(){

        $user = Auth::user();

        $prescription = [];

        $array = $user->patient->toArray();

        foreach($user->patient as $patient){

            if($patient->doctor_id !=null){
                foreach($patient->doctor as $doctor){

                    array_push($array, $doctor);
                }

            }

        }

        array_push($prescription, $array);


        return response()->json($user->patient, 201);

    }


    public function showPrescription(Patient $patient){

        $prescription = $patient->prescription;

        foreach($patient->prescription as $medicine){
            $prescription->$medicine = $medicine->medicine;

        }


        return response()->json($prescription, 201);
    }
    
}
