<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Medicine;
use App\Models\Detail;
use App\Models\Customer;
use App\Models\Buy;
use App\Models\Cart;



class PharmacyController extends Controller
{
    public function getAllMedicine(){
        $medicine = Medicine::latest()->paginate(5);
        return response()->json($medicine,200);
    }


    public function getMedicine(){

        $pharmacy = Auth::user();
        $detail = $pharmacy->detail;

        foreach($detail as $medicine){
            $medicine->medicine;
        }

        return response()->json($detail,200);
    }


    public function getAvailableMedicine(){
        $medicine = Medicine::all();

        return response()->json($medicine,200);
    }

    public function addMedicine(Request $request){
        $pharmacy = Auth::user();
        $request->validate([
            'medicine_id' => 'required|integer',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'MFD' => 'required|date',
            'EXP' => 'required|date',
        ]);

        Detail::create([
            'pharmacy_id' => $pharmacy->id,
            'medicine_id' => $request['medicine_id'],
            'quantity' => $request['quantity'],
            'price' => $request['price'],
            'MFD' => $request['MFD'],
            'EXP' => $request['EXP']
        ]);

        return response()->json(['add'=>'done'],200);
    }

    public function showMedicine(Medicine $medicine){
        $medicine->symptom = $medicine->symptom->flatten();
        $medicine->detail = $medicine->detail->flatten();

        return response()->json($medicine,200);
    }
    

    public function getMedicineByName(Request $request){
        $pharmacy = Auth::user();

        $test = $pharmacy->medicine->where('name', 'LIKE' ,'Librax');
        
        $medicine = $pharmacy->medicine->where('name', 'LIKE' ,'%ibra%');
        
   
        return response()->json($medicine,200);
        $i=0;
        foreach($medicine as $detailMedicine){

           $detail = $detailMedicine->detail;
           foreach($detail as $price){
               $medicine[$i]->price = $price->price;
           }
            $i++;
        }

       return response()->json($medicine,200);
    }



    public function getOrderMedicineByNameAsc(){
        $pharmacy = Auth::user();
        $detail = $pharmacy->detail;

        foreach($detail as $medicine){
            $medicine->medicine;
        }


        $detail =  $detail->sortBy('name')->flatten();

        return response()->json($detail,200);
    }


    public function getOrderMedicineByNameDesc(){
        
        $pharmacy = Auth::user();
        $detail = $pharmacy->detail;

        foreach($detail as $medicine){
            $detail->medicine = $medicine->medicine;
        }

        $detail->medicine = $detail->medicine->orderBy('name','asc')->get();

        return response()->json($detail,200);
    }



    public function getOrderMedicineByPriceAsc(){
        $pharmacy = Auth::user();
        $detail = $pharmacy->detail;

        foreach($detail as $medicine){
            $medicine->medicine;
        }


        $detail =  $detail->sortBy('price')->flatten();

        return response()->json($detail,200);
    }


    public function getOrderMedicineByPriceDesc(){
        
        $pharmacy = Auth::user();
        $detail = $pharmacy->detail;

        foreach($detail as $medicine){
            $medicine->medicine;
        }


        $detail =  $detail->sortByDesc('price')->flatten();

        return response()->json($detail,200);
         

        return response()->json($medicine,200);
    }


    public function updateMedicine(Request $request, Detail $detail){

        $request->validate([
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'MFD' => 'required|date',
            'EXP' => 'required|date',
        ]);
        

        $detail->update([
            'quantity' => $request['quantity'],
            'price' => $request['price'],
            'MFD' => $request['MFD'],
            'EXP' => $request['EXP'],
          ]);


          return response()->json($detail,200);
    }


    public function getPharmacyOrder(){
        $pharmacy = Auth::user();

         $customers = $pharmacy->pharmacy;

        foreach($pharmacy->pharmacy as $customer){

           $customers->customer = $customer->customer;

           $customers->cart = $customer->cart;
           $customers->buy = $customer->buy;

                foreach($customer->buy as $payment){
                    $customer->buy->medicine = $payment->medicine;
                    $customer->buy->payment = $payment->payment;
                }

                foreach($customer->cart as $cart){
                    $customer->cart->medicine = $cart->medicine;
                }
        }

        return response()->json($customers,200);
    }


    public function getPharmacyReservation(){
        $pharmacy = Auth::user();

        $customers = $pharmacy->pharmacy;

        foreach($pharmacy->pharmacy as $customer){

           $customers->customer = $customer->customer;
           $customers->address = $customer->customer->street->city->country;

           $customers->cart = $customer->cart;
           
           foreach($customer->cart as $cart){
             $customer->cart->medicine = $cart->medicine;
           }
        }
        return response()->json($customers,200);
    }


    public function getPharmacyOrders(){
        $pharmacy = Auth::user();

        $customers = $pharmacy->pharmacy;
        foreach($pharmacy->pharmacy as $customer){

           $customers->customer = $customer->customer;
           $customers->address = $customer->customer->street->city->country;
           $customers->buy = $customer->buy;

            foreach($customer->buy as $payment){
                $customer->buy->medicine = $payment->medicine;
                $customer->buy->payment = $payment->payment;
                    
            }
        }

        return response()->json($customers,200);
    }


    public function showCustomer(Customer $customer){

        $customer->buy;
        return response()->json($customer,200);
    }


    public function deliver(Buy $buy, Request $request){
        $buy->update([
            'delivred' => $request['delivred']
        ]);

        return response()->json($buy,200);
    }
    
    public function confirm(Cart $cart, Request $request){
        $cart->update([
            'reservation' => $request['confirm']
        ]);

        return response()->json($cart,200);
    }
    
}
