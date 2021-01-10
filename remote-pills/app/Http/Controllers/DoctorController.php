<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\User;

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
        $pharmacys = User::all();

        foreach($pharmacys as $pharmacy){
            $pharmacy->medicine;
        }
        
        return response()->json($pharmacys, 201); 
    }
}
