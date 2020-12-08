<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\CountryController;

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



Route::middleware(['auth:api', 'check_user_role:' . \App\Role\UserRole::ROLE_ADMIN])->group(function() {

    Route::get('/medicine', [PharmacyController::class, 'getMedicine']);
    

});

Route::group(['middleware' => 'auth:api'], function () {

    Route::get('/details', [AuthenticationController::class, 'details']);

    Route::get('/logout', [AuthenticationController::class, 'logout']);


});

Route::get('admin/finance', function () {
    //
})->middleware('check_user_role:' . \App\Role\UserRole::ROLE_FINANCE);
