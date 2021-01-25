<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DoctorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthenticationController::class, 'login']);

Route::post('/register', [AuthenticationController::class, 'register']);


Route::get('/country', [CountryController::class, 'getAllCountry']);
Route::get('/city/{country}', [CountryController::class, 'getAllCity']);
Route::get('/street/{city}', [CountryController::class, 'getAllStreet']);

Route::middleware(['auth:api', 'check_user_role:' . \App\Role\UserRole::ROLE_ADMIN])->group(function() {

    Route::get('/users', [AdminController::class, 'getUsers']); 

    Route::put('/admin/user/delete/{user}', [AdminController::class, 'deleteUser']); 

    Route::put('/admin/user/active/{user}', [AdminController::class, 'activeUser']);

    Route::post('/admin/medicine/addInfo', [AdminController::class, 'addMedicine']); 

    Route::get('/admin/pharmacy/getInfo/{user}', [AdminController::class, 'getInfoPharmacy']);

    Route::get('/admin/doctor/getInfo/{user}', [AdminController::class, 'getInfoDoctor']);

    Route::get('/admin/medicine/getInfo/{medicine}', [AdminController::class, 'getInfoMedicine']);

    Route::get('/admin/medicine/{medicine}/pharmacy', [AdminController::class, 'getMedicinePharmacy']);

    Route::get('/admin/pharmacy/{pharmacy}/medicine', [AdminController::class, 'getPharmacyMedicine']);

    Route::get('/admin/getAllSymptom', [AdminController::class, 'getAllSymptom']);

    Route::post('/admin/symptom', [AdminController::class, 'addSymptom']);
    

    
    
    Route::put('/admin/medicine/info/{medicine}', [AdminController::class, 'updateInfoMedicine']);


    Route::put('/admin/pharmacy/{user}', [AdminController::class, 'updatePharmacy']);

    

    Route::delete('/admin/medicine/{medicine}', [AdminController::class, 'destroy']);


    Route::get('/admin/allUsers/{type}', [AdminController::class, 'getUsers']);
});


Route::middleware(['auth:api', 'check_user_role:' . \App\Role\UserRole::ROLE_DOCTOR])->group(function() {

    Route::get('/doctor/getAskPrescription', [DoctorController::class, 'getAskPrescription']);

    Route::get('/doctor/getPatient', [DoctorController::class, 'getPatient']);


    Route::get('/doctor/prescription/{patient}', [DoctorController::class, 'getDescription']);

    Route::get('/doctor/getMedicine', [DoctorController::class, 'getMedicine']);

    Route::post('/doctor/send/{patient}', [DoctorController::class, 'sendPrescription']);
    

});


Route::middleware(['auth:api', 'check_user_role:' . \App\Role\UserRole::ROLE_PHARMACY])->group(function() {

    Route::get('/pharmacy/medicine/allMedicine', [PharmacyController::class, 'getAllMedicine']); 


    Route::get('/pharmacy/medicine', [PharmacyController::class, 'getMedicine']); 

    Route::get('/pharmacy/available/medicine', [PharmacyController::class, 'getAvailableMedicine']); 

    

    Route::post('/pharmacy/medicine/getByName', [PharmacyController::class, 'getMedicineByName']); 

    Route::get('/pharmacy/medicine/orderNameAsc', [PharmacyController::class, 'getOrderMedicineByNameAsc']); 
    
    Route::get('/pharmacy/medicine/orderNameDesc', [PharmacyController::class, 'getOrderMedicineByNameDesc']);

    Route::get('/pharmacy/medicine/orderPriceAsc', [PharmacyController::class, 'getOrderMedicineByPriceAsc']);

    Route::get('/pharmacy/medicine/orderPriceDesc', [PharmacyController::class, 'getOrderMedicineByPriceDesc']);

    Route::post('/pharmacy/medicine', [PharmacyController::class, 'addMedicine']); 

    Route::get('/pharmacy/medicine/{medicine}', [PharmacyController::class, 'showMedicine']); 

    Route::put('/pharmacy/medicine/{detail}', [PharmacyController::class, 'updateMedicine']); 

    Route::get('/pharmacy/order', [PharmacyController::class, 'getPharmacyOrder']); 

    Route::get('/pharmacy/orders', [PharmacyController::class, 'getPharmacyOrders']); 

    Route::get('/pharmacy/reservation', [PharmacyController::class, 'getPharmacyReservation']); 


    Route::put('/pharmacy/customer/{customer}', [PharmacyController::class, 'showCustomer']);   
    
    
    Route::put('/pharmacy/deliver/{buy}', [PharmacyController::class, 'deliver']); 

    Route::put('/pharmacy/confirm/{cart}', [PharmacyController::class, 'confirm']); 

    

});

Route::middleware(['auth:api', 'check_user_role:' . \App\Role\UserRole::ROLE_NORMALUSER])->group(function() {
    //get all medicine in each pharmacy
    Route::get('/user/pharmacyMedicine', [UserController::class, 'getAllMedicinePharmacy']); 

    Route::post('/user/order/medicine', [UserController::class, 'orderMedicine']); 

    Route::get('/user/allPharmacy', [UserController::class, 'getAllPharmacies']); 

    Route::get('/user/allMedicine/{id}', [UserController::class, 'getAllMedicineAvailable']); 


    Route::get('/user/medicine/{medicine}', [UserController::class, 'showMedicine']); 


    Route::post('/user/medicine/addCartMedicine/{medicine}', [UserController::class, 'addCartMedicine']);
    
   
    Route::get('/user/cart/getCartMedicine', [UserController::class, 'getCartMedicine']);


    Route::delete('/user/cart/deleteCart/{cart}', [UserController::class, 'deleteCartMedicine']);


    Route::post('/user/addPayment', [UserController::class, 'addPayment']);

    Route::post('/user/askPrescription', [UserController::class, 'askPrescription']);

    Route::get('/user/getPrescription', [UserController::class, 'getPrescription']);


    Route::get('/user/prescription/{patient}', [UserController::class, 'showPrescription']);
  

});


Route::group(['middleware' => 'auth:api'], function () {
   
    Route::get('/all/users', [UserController::class, 'getAllUsers']); 


    Route::put('/user/profile', [AuthenticationController::class, 'setProfile']);

  

    Route::get('/details', [AuthenticationController::class, 'details']);

    Route::get('/logout', [AuthenticationController::class, 'logout']);


});

