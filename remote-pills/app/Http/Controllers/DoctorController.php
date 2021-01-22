<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\Medicine;
use App\Models\Prescription;

class DoctorController extends Controller
{
    public function getPatient(){
        $doctor = Auth::user();

        $doctor->doctor;
        foreach($doctor->doctor as $patient){
            $patient->patient;
            foreach($patient->prescription as $prescription){
                $prescription->medicine;
            }
        }

        return response()->json($doctor, 201);
    }


    public function getAskPrescription(){
        $patients = Patient::all();
        $array = [];

        foreach($patients as $patient){
            if($patient->doctor_id == null){
                $patient->patient;
                array_push($array, $patient);
            }
        }

        return response()->json($array, 201); 
    }


    public function getDescription(Patient $patient){
        $patient->patient;
        return response()->json($patient, 201); 
    }


    public function getMedicine(){
        $medicines = Medicine::all();

        foreach($medicines as $medicine){
            $medicine->pharmacy;
        }
        
        return response()->json($medicines, 201); 
    }


    public function sendPrescription(Request $request, Patient $patient){
        $doctor = Auth::user();
        $patient->doctor_id = $doctor->id;
        $patient->save();


        $send = $request['array'];


        $array = explode("/", $send ); 

        $arrlength =count($array);

        for($i=0;$i<$arrlength-1;$i++){
            $arr2 = explode(",",$array[$i]);
            $medicine_id = $arr2[0];
            $quantity = $arr2[1];

            Prescription::create([
                'patient_id' => $patient->id,
                'medicine_id' => $medicine_id,
                'quantity' => $quantity
            ]);
        }

        return response()->json($send, 201); 
    }
}
