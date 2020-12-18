<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Medicine;
use App\Models\Detail;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class PharmacyController extends Controller
{
    public function getAllMedicine(){
        $medicine = Medicine::get();
        return response()->json($medicine,200);
    }


    public function getMedicine(){

        $pharmacy = Auth::user();
        $medicine = $pharmacy->medicine;

        $i=0;
         foreach($medicine as $detailMedicine){

            $detail = $detailMedicine->detail;
            foreach($detail as $price){
                $medicine[$i]->price = $price->price;
            }
             $i++;
         }

        //  $data = $this->paginate($medicine);
        // return response()->json($data,200);

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
    }

    public function showMedicine(Medicine $medicine){
        $medicine->symtom = $medicine->symtom->flatten();
        $medicine->detail = $medicine->detail->flatten();

        return response()->json($medicine,200);
    }
    


    public function paginate($items, $perPage = 5, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
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
        $medicine = $pharmacy->medicine->sortByDesc('name')->flatten();//lezem tkun sort by

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


    public function getOrderMedicineByNameDesc(){
        
        $pharmacy = Auth::user();
        $medicine = $pharmacy->medicine->sortBy('name')->flatten();

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



    public function getOrderMedicineByPriceAsc(){
        
        $pharmacy = Auth::user();
        $medicine = $pharmacy->medicine;

        $i=0;
         foreach($medicine as $detailMedicine){

            $detail = $detailMedicine->detail;
            foreach($detail as $price){
                $medicine[$i]->price = $price->price;
            }
             $i++;
         }

         $medicine = $medicine->sortBy('price')->flatten();

        return response()->json($medicine,200);
    }


    public function getOrderMedicineByPriceDesc(){
        
        $pharmacy = Auth::user();
        $medicine = $pharmacy->medicine;


        $i=0;
         foreach($medicine as $detailMedicine){

            $detail = $detailMedicine->detail;
            foreach($detail as $price){
                $medicine[$i]->price = $price->price;
            }
             $i++;
         }

         $medicine = $medicine->sortByDesc('price')->flatten();
         

        return response()->json($medicine,200);
    }


    
}
